import React, { Component } from 'react';

export default class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const courses = await fetch('/courses', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json());

    this.setState({ courses, loading: false });
  }

  render() {
    const { courses, loading } = this.state;
    if (loading) return <p>Loading...</p>;
    return (
      <ul>
        {courses.map(course => <li key={course.id}>{course.code}</li>)}
      </ul>
    );
  }
}
