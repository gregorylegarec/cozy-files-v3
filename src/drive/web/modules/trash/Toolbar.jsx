/* global cozy */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import { Button, withBreakpoints } from 'cozy-ui/react'
import { showModal } from 'lib/react-cozy-helpers'
import classNames from 'classnames'

import { MoreButton } from 'components/Button'
import Menu, { Item } from 'components/Menu'
import EmptyTrashConfirm from './components/EmptyTrashConfirm'

import { emptyTrash } from './actions'

import styles from 'drive/styles/toolbar'

const { BarRight } = cozy.bar

const Toolbar = ({
  t,
  disabled,
  emptyTrash,
  onSelectItemsClick,
  breakpoints: { isMobile }
}) => {
  const MoreMenu = (
    <Menu
      title={t('toolbar.item_more')}
      disabled={disabled}
      className={styles['fil-toolbar-menu']}
      button={<MoreButton>{t('Toolbar.more')}</MoreButton>}
    >
      <Item>
        <a className={styles['fil-action-delete']} onClick={() => emptyTrash()}>
          {t('toolbar.empty_trash')}
        </a>
      </Item>
      <hr />
      <Item>
        <a className={styles['fil-action-select']} onClick={onSelectItemsClick}>
          {t('toolbar.menu_select')}
        </a>
      </Item>
    </Menu>
  )

  return (
    <div className={styles['fil-toolbar-trash']} role="toolbar">
      <Button
        theme={'danger-outline'}
        className={classNames(styles['u-hide--mob'])}
        onClick={() => emptyTrash()}
        disabled={disabled}
        icon="delete"
        label={t('toolbar.empty_trash')}
      />

      {isMobile ? <BarRight>{MoreMenu}</BarRight> : MoreMenu}
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  emptyTrash: () =>
    dispatch(
      showModal(<EmptyTrashConfirm onConfirm={() => dispatch(emptyTrash())} />)
    )
})

export default translate()(
  withBreakpoints()(connect(null, mapDispatchToProps)(Toolbar))
)