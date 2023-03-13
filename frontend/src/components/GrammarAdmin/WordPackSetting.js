import SettingsIcon from '@material-ui/icons/Settings';
import GrammarLevel from '../UI/GrammarLevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function GrammarLevelSetting({ classNameIcon, onChoose }) {
  const [openWordPack, setOpenWordPack] = useState(false);

  const onSelect = (v) => {
    onChoose(v);
    setOpenWordPack(false);
  };

  return (
    <>
      <SettingsIcon
        className={classNameIcon}
        onClick={() => setOpenWordPack(true)}
      />

      {/* setting modal */}
      {openWordPack && (
        <GrammarLevel
          open={openWordPack}
          onCancel={() => setOpenWordPack(false)}
          onChoose={onSelect}
        />
      )}
    </>
  );
}

GrammarLevelSetting.propTypes = {
  classNameIcon: PropTypes.string,
  onChoose: PropTypes.func,
};

GrammarLevelSetting.defaultProps = {
  onChoose: () => {},
};

export default GrammarLevelSetting;
