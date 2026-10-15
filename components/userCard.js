import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';
import Link from 'next/link'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components'

const StyledCard = styled(Card)`
  margin: 6em;
  color: white;
`

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Employed(props) {
  const isHired = props.higherable;
  if (isHired) {
    return <p>Hirable</p>;
  } else {
    return <p>Not</p>;
  }
}

const UserCard = (props) => (
  <StyledCard style={{ backgroundColor: '#515662' }}>
    <CardHeader style={{ color: '#fff' }}
      avatar={
        <Avatar alt="Avatar" src={props.avatar_url} />
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      titleTypographyProps={{ variant: 'h6' }}
      title={props.name}
      subheader={props.email}
    />
    <Divider style={{ backgroundColor: '#666a75' }} variant="middle" />

    <CardContent style={{ color: '#fff' }}>

      <Grid container spacing={2}>

        <Grid item xs>
          <Typography variant="body1" component="p">
            {props.bio}
          </Typography>

          <Typography variant="body2">
            <Link legacyBehavior href={props.blog}>Blog</Link>
          </Typography>

          <Typography variant="body2">
            {props.email}
          </Typography>

          <PieChart width={200} height={150}>
            <Pie
              data={data}
              cx={60}
              cy={80}
              innerRadius={30}
              outerRadius={50}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>

        </Grid>

        <Grid item xs>
          <Typography variant="body2">
            {props.location}
          </Typography>

          <Typography variant="body2">
            Current company: {props.company}
          </Typography>

          {props.hireable &&
            <p>{'is searching'}</p>
          }

        </Grid>
      </Grid>

    </CardContent>

    <CardActions style={{ backgroundColor: '#40434e' }}>

      <Grid item xs>
        <Checkbox style={{ color: '#80cbc4' }} />
        <span style={{ color: '#fff' }}>save</span>
      </Grid>

      <Grid item xs={2}>
        <Button style={{ backgroundColor: '#1194f6', color: '#fff' }} variant="contained" size="small">
          Share
          </Button>
      </Grid>

      <Grid item xs={3}>
        <Button style={{ backgroundColor: '#1194f6', color: '#fff' }} variant="contained" size="small">
          More Info
          </Button>
      </Grid>

    </CardActions>

  </StyledCard >
)

export default UserCard
