import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/Coligo";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Exam() {
  let [questions, setQuestions] = useState([]);
  let [subject, setSubject] = useState([]);
  let [score, setScore] = useState(0);
  let {id} = useParams()
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchDta = async () => {
      try {
        const response = await axiosInstance.get(`/subjects/${id}/questions`);
        const response2 = await axiosInstance.get(`/subjects/${id}`);
        if (response.data) {
          console.log(response.data.data.questions);
          setQuestions(response.data.data.questions);
        }
        if (response2.data) {
            console.log(response2.data.data.subject.subjectTitle);
            setSubject(response2.data.data.subject.subjectTitle);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDta();
  }, []);

//   const submitExam = ()=>{
//     console.log("Finish");
//   }

  const handleRadioChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const submitExam = () => {
    let score = 0 ;
    // if(questions.length ===  answers.length){
        for (const question of questions) {
          const userAnswer = answers[question._id];
          console.log(userAnswer, question.rightAnswer);
          if(userAnswer === question.rightAnswer){
            score++;
          }
        }
        
        Swal.fire({
            title: "Your Score",
            text: `${score} / ${questions.length}`,
        });
    // }else{
    //     Swal.fire({
    //         icon:"warning",
    //         title: "Finish All Questions",
    //         text: `check your answers ^_^`,
    //     });
    // } 
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>{subject}</h1>
        <Grid container spacing={3}>
          {questions.map((question) => (
            <Grid item xs={12} key={question._id}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <h3>{question.question}</h3>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={question._id}
                value={answers[question._id] || ''}
                onChange={(e) => handleRadioChange(question._id, e.target.value)}
                  >
                    <FormControlLabel
                      value="True"
                      control={<Radio />}
                      label="True"
                    />
                    <FormControlLabel
                      value="False"
                      control={<Radio />}
                      label="False"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
          ))}
          <Button sx={{ m: 3}} variant="contained" onClick={submitExam}>Finish Exam</Button>
        </Grid>
      </Container>
    </Box>
  );
}
