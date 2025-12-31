import { Auth } from 'aws-amplify'

const TestAuth = () => {
  const handleTestSignup = async () => {
    try {
      await Auth.signUp({
        username: 'testuser123@gmail.com',
        password: 'Test@1234',
        attributes: { email: 'testuser123@gmail.com' },
      })
      alert('Signup successful. Check email.')
    } catch (err) {
      console.error(err)
      alert(err.message || String(err))
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={handleTestSignup}>
        Test Signup
      </button>
    </div>
  );
};

export default TestAuth;
