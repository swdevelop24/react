import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import usePhoneBookStore from "../stores/usePhoneBookStore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { addContact } = usePhoneBookStore();

  // 연락처 추가 핸들러
  const handleAddContact = () => {
    if (!name.trim() || !phoneNumber.trim()) return;
    addContact(name, phoneNumber);
    setName("");
    setPhoneNumber("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      width="100%"
      marginBottom="24px" // 목록창과의 간격 추가
      className="form-container"
      sx={{marginBottom:"100px"}}
    >
      {/* 이름 + 전화번호 입력란을 수직 배치 */}
      <Box
        display="flex"
        flexDirection="column" // 입력 필드는 세로로 배치
        gap={1}
        width="20%" // 입력 필드 크기를 더 작게 조정
        
      >
        <TextField
          id="name"
          label="이름"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: "100%",
            height: "40px", 
            "& .MuiOutlinedInput-root": {
              height: "36px",
            },
          }}
        />
        <TextField
          id="phone-number"
          label="전화번호"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{
            width: "100%",
            height: "40px", 
            "& .MuiOutlinedInput-root": {
              height: "36px",
            },
          }}
        />
      </Box>

      {/* ADD 버튼을 오른쪽에 배치하고 높이를 두 개의 입력란 높이에 맞춤 */}
      <Button
        variant="contained"
        size="large"
        onClick={handleAddContact}
        sx={{
          height: "76px", // 높이를 더 줄임
          minWidth: "90px", //  버튼 너비를 살짝 줄임
        }}
      >
        ADD
      </Button>
    </Box>
  );
};

export default ContactForm;
