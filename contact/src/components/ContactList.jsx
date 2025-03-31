import React, { useState, useEffect } from "react";
import usePhoneBookStore from "../stores/usePhoneBookStore";
// MUI 관련 import
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTrash, faList, faSearch } from "@fortawesome/free-solid-svg-icons";

const ContactList = () => {
  const {
    phoneBook,
    removeContact,
    searchContacts,
    filteredPhoneBook = [],
    removeAllContacts,
  } = usePhoneBookStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 초기에는 전체 연락처 보여주기
  useEffect(() => {
    searchContacts(""); // 초기 목록
  }, [searchContacts]);

  // 검색 핸들러
  const handleSearch = () => {
    searchContacts(searchQuery);
  };

  // 연락처 추가 (임시로 console.log로 테스트)
  const handleAddContact = () => {
    if (name && phoneNumber) {
      console.log("추가됨:", { name, phoneNumber });
      setName("");
      setPhoneNumber("");
    } else {
      alert("이름과 전화번호를 입력하세요!");
    }
  };

  // 연락처 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      removeContact(id);
    }
  };

  // 전체 삭제 핸들러
  const handleRemoveAll = () => {
    if (window.confirm("모든 연락처를 삭제하시겠습니까?")) {
      removeAllContacts();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" marginTop={4}>
      {/* 제목 */}
     

      {/* 연락처 목록 박스 */}
      <Paper
        sx={{
          width: {
            xs: "95%", // 모바일: 전체 너비
            sm: "80%", // 태블릿
            md: "60%", // 데스크탑
          },
          maxHeight: 500,
          overflow: "auto",
          boxShadow: 3,
          borderRadius: "8px",
          padding: 2,
        }}
      >
        {/* 제목 */}
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
          <Typography variant="h6" component="h3">
          <FontAwesomeIcon icon={faList} /> 목록
          </Typography>
        </Box>

        {/* 검색창 + 검색 버튼 + 전체 삭제 */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          flexDirection={{
            xs: "column", // 모바일: 세로 정렬
            sm: "row", // 태블릿 이상: 가로 정렬
          }}
          marginBottom={2}
        >
          <TextField
            label="검색"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{
              width: {
                xs: "100%", // 모바일: 전체 너비
                sm: "auto",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<FontAwesomeIcon icon={faSearch} />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            검색
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveAll}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              marginTop: {
                xs: 1,
                sm: 0,
              },
            }}
          >
            ALL 삭제 !
          </Button>
        </Box>

        {/* TableContainer */}
        <TableContainer
          sx={{
            maxHeight: 300,
            overflowX: "auto", // 가로 스크롤 허용
          }}
        >
          <Table stickyHeader>
            {/* 테이블 헤더 */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>이름</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>전화번호</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="center">
                  삭제
                </TableCell>
              </TableRow>
            </TableHead>

            {/* 테이블 바디 */}
            <TableBody>
              {filteredPhoneBook.length > 0 ? (
                filteredPhoneBook.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(item.id)}
                        startIcon={<FontAwesomeIcon icon={faTrash} />}
                      >
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    연락처가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ContactList;
