// AboutMe.js

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const AboutMe = () => {
  return (
    <Container>
      <Title>About Me</Title>
      <Paragraph>
        My Name: Jay Patel
        <br />
        Email: jaypatel32157@gmail.com
        <br />
        <br />
        My Info: I am a Full Stack Developer currently pursuing my Master of Computer Science from North Carolina State University.
        <br />
        <br />
        I have a strong passion for web development and software engineering. My technical skills include proficiency in JavaScript, TypeScript, React, Node.js, HTML/CSS, and various web technologies.
        <br />
        <br />
        Throughout my academic and professional journey, I have worked on several projects involving frontend development, backend APIs, database management, and cloud services. I enjoy solving complex problems and creating efficient, scalable solutions.
        <br />
        <br />
        Outside of coding, I love exploring new technologies, learning about AI and machine learning, and participating in hackathons and coding competitions.
      </Paragraph>
    </Container>
  );
};

export default AboutMe;
