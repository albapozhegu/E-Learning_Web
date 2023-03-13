import VocabularyData from 'components/WordUser/Vocabulary/data';
import useTitle from 'hooks/useTitle';
import React from 'react';

function VocabularyPage() {
  useTitle('Vocabulary');

  return <VocabularyData />;
}

export default VocabularyPage;
