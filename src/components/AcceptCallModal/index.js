import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const AcceptCallModal = (props) => (
  <Modal open={props.open} basic size='tiny'>
    <Header icon='phone volume' content='Incoming Call' />
    <Modal.Content>
      <p>
        Get ready to answer a call from a customer.
      </p>
      <p>
        Click Accept when you are ready! Dont take too long ;)
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={props.handleAcceptedCall} loading={props.isLoading} inverted={!props.isLoading}>
        <Icon name='checkmark' /> Accept
      </Button>
    </Modal.Actions>
  </Modal>
);

export default AcceptCallModal;
