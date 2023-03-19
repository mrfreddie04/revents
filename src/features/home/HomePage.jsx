import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Icon } from "semantic-ui-react";

export default function HomePage() {
  const history = useHistory();

  const handleNavigateEvents = () => {
    history.push('/events');
  }

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' style={{marginBottom:'12px'}}/>
          Re-vent
        </Header>
        {/* <Button size='huge' inverted as={NavLink} to="/events">
          Get started
          <Icon name='right arrow' inverted/>
        </Button> */}
        <Button size='huge' inverted onClick={handleNavigateEvents}>
          Get started
          <Icon name='right arrow' inverted/>
        </Button>        
      </Container>
    </Segment>
  )
}