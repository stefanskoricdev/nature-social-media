import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <section>
      <AuthWrapper>
        <LoginForm />
      </AuthWrapper>
    </section>
  );
};

export default Login;
