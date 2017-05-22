import React from 'react'
import { connect } from 'react-redux'
import { translate } from '../../../../src/lib/I18n'
import SettingCategory, { ELEMENT_BUTTON } from '../../components/SettingCategory'
import Modal from 'cozy-ui/react/Modal'
import { showUnlinkConfirmation, hideUnlinkConfirmation, unlink } from '../../actions/unlink'

export const Unlink = ({ t, showUnlinkConfirmation, hideUnlinkConfirmation, displayUnlinkConfirmation, unlink, client }) => (
  <div>
    <SettingCategory
      title={t('mobile.settings.unlink.title')}
      elements={[
        {
          type: ELEMENT_BUTTON,
          description: t('mobile.settings.unlink.description'),
          text: t('mobile.settings.unlink.button'),
          theme: 'danger-outline',
          onClick: showUnlinkConfirmation
        }
      ]}
    />
    {displayUnlinkConfirmation && <Modal
      title={t('mobile.settings.unlink.confirmation.title')}
      description={t('mobile.settings.unlink.confirmation.description')}
      secondaryText={t('mobile.settings.unlink.confirmation.cancel')}
      secondaryAction={hideUnlinkConfirmation}
      primaryType='danger'
      primaryText={t('mobile.settings.unlink.confirmation.unlink')}
      primaryAction={() => unlink(client)}
    />}
  </div>
)

const mapStateToProps = state => ({
  displayUnlinkConfirmation: state.mobile.ui.displayUnlinkConfirmation,
  client: state.settings.client
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  showUnlinkConfirmation: () => dispatch(showUnlinkConfirmation()),
  hideUnlinkConfirmation: () => dispatch(hideUnlinkConfirmation()),
  unlink: (client) => {
    dispatch(unlink(client))
    ownProps.router.replace('/onboarding')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Unlink))
