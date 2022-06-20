import { Box, Card, Container, Button, styled } from '@mui/material';
import {  useEffect } from 'react';
import React  from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import type { ReactElement }   from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { useRouter } from 'next/router';

import Link from 'src/components/Link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';
import Highlights from 'src/content/Overview/Highlights';
import LanguageSwitcher from 'src/layouts/BoxedSidebarLayout/Header/Buttons/LanguageSwitcher';
import Footer from 'src/components/Footer';

import DashboardReportsContent from 'src/content/DashboardPages/reportsCard';
 import HealthReportsContent from 'src/content/DashboardPages/reportsCardHealth';
 import PeopleReportsContent from 'src/content/DashboardPages/reportsCardPeople';
//  import SecurityReportsContent from 'src/content/DashboardPages/reportsCardSecurity';
 import TourismReportContent from 'src/content/DashboardPages/reportCardTourism'


import CollapsedSidebarLayout from 'src/layouts/CollapsedSidebarLayout';


const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

type CounterProps = {
  items: any,
  active: any 
};

type CounterState = {
  items: any,
  active: any,
  direction:any
};

class Carousel extends React.Component<CounterProps, CounterState> {
  rightClick: any;
  leftClick: any;
    
  constructor(props) {
      super(props)
      this.state = {
          items: this.props.items,
          active: this.props.active,
          direction: ''
      }
      this.rightClick = this.moveRight.bind(this)
      this.leftClick  = this.moveLeft.bind(this)
  }

  generateItems() {
      var items = []
      var level
      console.log(this.state.active)
      for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
          var index = i
          if (i < 0) {
              index = this.state.items.length + i
          } else if (i >= this.state.items.length) {
              index = i % this.state.items.length
          }
          level = this.state.active - i
          items.push(<Item key={index} levelkey={index} id={this.state.items[index]} level={level} />)
      }
      return items
  }
  
  moveLeft() {
      var newActive = this.state.active
      newActive--
      this.setState({
          active: newActive < 0 ? this.state.items.length - 1 : newActive,
          direction: 'left'
      })
  }
  
  moveRight() {
      var newActive = this.state.active
      this.setState({
          active: (newActive + 1) % this.state.items.length,
          direction: 'right'
      })
  }
  
  render() {
      return(
          <div id="carousel" className="noselect">
            {this.state.active !=0? <div className="arrow arrow-left" onClick={this.leftClick}><ArrowBackIosIcon/></div> : <div className="arrow arrow-left" ></div>} 
              <TransitionGroup 
                  transitionName={this.state.direction}>
                  {this.generateItems()}
              </TransitionGroup>
              {this.state.active <3? <div className="arrow arrow-right" onClick={this.rightClick}><ArrowForwardIosIcon/></div> : <div className="arrow arrow-right" ></div>}
          </div>
      )
  }
}


type ItemProps = {
  level: any
  id:any
  levelkey:any
};

type ItemState = {
  level: any
};

class Item extends React.Component<ItemProps, ItemState>  {
  
  constructor(props) {
      super(props)
      this.state = {
          level: this.props.level
      }
  }
  
  render() {
      const className = 'item level' + this.props.level
      return(
          <div className={className}
              style={{
                  backgroundImage: "url(http://lorempixel.com/400/200/)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
              }}
              >
                   {this.props.level==0  ?(this.props.levelkey == 0 ?<DashboardReportsContent />:
                  this.props.levelkey == 1 ?<HealthReportsContent/>: 
                  this.props.levelkey == 2 ? <PeopleReportsContent/>:   
                  this.props.levelkey==3?<TourismReportContent/>: null) :null}  
      
  

          </div>
      )
  }
}


function Overview() {
  const { t }: { t: any } = useTranslation();
  const router = useRouter();
  // useEffect(() => {
  //   router.push('/dashboards/reports')  
  //  })
  var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  return (
    <OverviewWrapper>
      <Carousel items={items} active={0} />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <CollapsedSidebarLayout>{page}</CollapsedSidebarLayout>;
};