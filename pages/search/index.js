import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import { getUsers } from '../../helpers/getUsers'
import UserCard, { userCard } from '../../components/userCard'
import styled from 'styled-components'
import { Layout, Column } from '../../components/layoutStyles';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { styled as styled2 } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import SimpleMenu from '../../components/dropdown'
import Button from "@material-ui/core/Button"

const CardScrollContainer = styled.div`
  display: flex;
  overflow: hidden;
  height: 100vh;
  margin-top: -100px;
  padding-top: 100px;
  position: relative;
  // width: 100%;
  backface-visibility: hidden;
  will-change: overflow;
`

const styles = theme => ({
  root: {
    color: '#fff'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: '#fff',
  },

  multilineColor: {
    color: '#fff'
  },

  cssLabel: {
    color: '#fff'
  },

  input: {
    color: '#fff'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    color: '#fff'
  },

  cssOutlinedInput: {
    color: '#fff',
  },

  cssFocused: {
    color: '#fff'
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  cssLabel: {
    color: '#fff',
  },
  cssOutlinedInput: {
    '$notchedOutline': {
      borderColor: '#fff',
    },
  },

});


const ScrollSection = styled.div`
  overflow: auto;
  height: auto;
  width: auto;
  padding: .5rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
`

const ColumnSidebar = styled.div`
  background-color: #1c1d22;
  color: white;
  margin: 0px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  box-sizing:border-box;
  max-height: 100vh;
  max-width: 30vw;
`

const StyledSelect = styled.div`
padding-top: 12px;
`

const StyledTextField = styled2(TextField)({
  color: '#fff',
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { language: '', location: '', experience: 1, users: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const results = await getUsers(this.state.location, this.state.location, this.state.experience)
    this.setState({ users: results })
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  }

  handleSelect = event => {
    console.log('selector')
    this.setState({ experience: event.target.value })
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <ColumnSidebar>
          <h1>{"Search for a Developer"}</h1>

          <StyledTextField
            id="standard-language"
            name="language"
            label="Programing Language"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange('language')}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.cssFocused,
                label: classes.input,
                focused: classes.cssFocused,
                className: classes.input
              },
            }}

            InputProps={{
              classes: {
                root: classes.cssFocused,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                className: classes.input
              }
            }}
          />

          <StyledTextField
            id="standard-location"
            name="location"
            label="Location"
            className={classes.textField}
            value={this.state.location}
            onChange={this.handleChange('location')}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.cssFocused,
                label: classes.input,
                focused: classes.cssFocused,
                className: classes.input
              },
            }}

            InputProps={{
              classes: {
                root: classes.cssFocused,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                className: classes.input
              }
            }}
          />
          <StyledSelect>
            <InputLabel style={{ color: '#fff' }} id="demo-simple-select-label" value={this.state.value} onChange={this.handleChange}>Experience</InputLabel>
          </StyledSelect>

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.experience}
            onChange={this.handleSelect}
            style={{ color: '#fff', underline: '#fff' }}
          >
            <MenuItem style={{ color: '#000' }} value={1}>{'Beginner'}</MenuItem>
            <MenuItem value={2}>{'Intermediate'}</MenuItem>
            <MenuItem value={3}>{'Advanced'}</MenuItem>
          </Select>
          <Button style={{ backgroundColor: '#fff' }} label="Submit" type="submit" onClick={this.handleSubmit} >Submit</Button>
        </ColumnSidebar>

        <Column>
          <h1>{"Devs"}</h1>
          <CardScrollContainer>
            <ScrollSection>
              {this.state.users.map((user, index) => (
                <UserCard {...this.state.users[index]} />
              ))}
            </ScrollSection>
          </CardScrollContainer>
        </Column>
      </Layout >
    )
  }
}

export default withStyles(styles)(Home);