
import React from 'react';
import { useTranslation } from 'react-i18next';

function LocalizauionTest() {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('greeting')}</p>
      <p>{t('welcome')}</p>
    </div>
  );
}

export default LocalizauionTest;
