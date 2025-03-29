import React from 'react'
import { Button, Form, Container } from 'react-bootstrap';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';





// const Login = ({setAuthenticate}) => {


//   const navigate = useNavigate();


//   const loginUser =(event)=>{
//     event.preventDefault();
//     console.log("login user function issue");
//     setAuthenticate(true);
//     navigate('/')
//   }
//   return (
//     <Container className={styles[`container-center`]}>
//       <Form onSubmit={(event) =>{loginUser(event)}}>
//         <Form.Group className={`mb-3 ${styles['form-width']}`}  controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" />
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className={`mb-3 ${styles['form-width']}`} controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" placeholder="Password" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Check me out" />
//         </Form.Group>
//         <Button variant="danger" type="submit">
//          로그인
//         </Button>
//       </Form>
//     </Container>
//   )
// }

const Login = ({ setAuthenticate }) => {
  const navigate = useNavigate();

  // 로그인 핸들러
  const loginUser = (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지 (새로고침이 발생하지 않게 함)
    console.log('로그인 성공!');
    setAuthenticate(true); // 로그인 상태 변경
    navigate('/'); // 메인 페이지로 이동
  };

  // {/* */}는 **JSX 주석 (JavaScript XML 주석) 
  return (
    <Container className={styles[`container-center`]}>
      {/* 로그인 폼 */}
      <Form onSubmit={loginUser}>
        {/*  이메일 입력 */}
        <Form.Group className={`mb-3 ${styles['form-width']}`} controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        {/* 비밀번호 입력 */}
        <Form.Group className={`mb-3 ${styles['form-width']}`} controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"  placeholder="Enter password"required />
        </Form.Group>

        {/*  로그인 버튼 */}
        <Button variant="danger" className={styles['form-button']} type="submit">
          로그인
        </Button>
      </Form>
    </Container>
  );
};


export default Login
