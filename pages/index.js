import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Image = styled.img`
  height:10em;
`

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <div className='hero'>
      <h1 className='title'>Git a Dev</h1>
      <p className='description'>
        Use the power of Github to find good developers and learn what makes a good profile.
      </p>

      {/* <div className='pageDiv'>
        hi
        </div>
      <div className='pageDivRight'>
        hi
        </div> */}


      <div className='row'>
        <Link legacyBehavior href='/search'>
          <Button>
            <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/people_search_wctu.svg" />
            <Typography>
              Search
                </Typography>
          </Button>
        </Link>

        <Link legacyBehavior href='/insight'>
          <Button>
            <Image src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/feedback_h2ft.svg" />
            <Typography>
              Insight
            </Typography>
          </Button>
        </Link>

      </div>
    </div>
    <style jsx>{`
      .pageDiv {
        height:200px;
        width:30%;
        background-color: green;
      }
      .pageDivRight {
        height:200px;
        width:30%;
        background-color: blue;
      }
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div >
)

export default Home
