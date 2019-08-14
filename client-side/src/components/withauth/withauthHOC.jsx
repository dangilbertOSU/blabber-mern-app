import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        user: null,
      };
    }

    componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            res.json()
            .then(result => this.setState({ user: result.username }));
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;

      if (loading) {
        return null;
      }

      if (redirect) {
        return <Redirect to="/register" />;
      }

      return (
        <React.Fragment>
          <ComponentToProtect user={this.state.user}{...this.props} />
        </React.Fragment>
      );
    }
  };
}
