


class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const name = ReactDOM.findDOMNode(this._nameInput).value;
    const email = ReactDOM.findDOMNode(this._emailInput).value;
    const password = ReactDOM.findDOMNode(this._passwordInput).value;

    const errors = validate(name, email, password);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // submit the data...
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
        <input
          ref={nameInput => this._nameInput = nameInput}
          type="text"
          placeholder="Name"
        />
        <input
          ref={emailInput => this._emailInput = emailInput}
          type="text"
          placeholder="Email"
        />
        <input
          ref={passwordInput => this._passwordInput = passwordInput}
          type="password"
          placeholder="Password"
        />
        
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(<SignUpForm />, document.body);