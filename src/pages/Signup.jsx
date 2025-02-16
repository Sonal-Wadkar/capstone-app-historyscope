import Register from "../components/Register.jsx";  // ✅ Default import

function Signup({ onFormSwitch }) {
  return (
    <div>
      <Register onFormSwitch={onFormSwitch} />
    </div>
  );
}

export default Signup;
