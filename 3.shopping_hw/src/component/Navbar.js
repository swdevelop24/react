import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setAuthenticate }) => {
  const menuList = [
    '여성',
    'Divided',
    '남성',
    '신생아/유아',
    '아동',
    'H&M Home',
    'Sale',
    '지속가능성',
  ];

  const navigate = useNavigate();
  const inputRef = useRef();

  const handleLoginLogout = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지 ㅋㅋㅋ 확실하게 이번엔 이중방지 !! ㅋㅋ 

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const newLoginStatus = !isLoggedIn;
    setAuthenticate(newLoginStatus);

    if (newLoginStatus) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    }
  };

  const search = (event) => {
    if (event.key === 'Enter') {
      const keyword = event.target.value;
      navigate(`/?q=${keyword}`);
      inputRef.current.value = "";
    }
  };

  const clickNav = () => {
    navigate('/');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="navbar-wrapper">
      {/* 로그인 버튼 */}
      <div className="login-button" onClick={(e) => e.stopPropagation()}>
        <button className="login-btn" onClick={handleLoginLogout}>
          <FontAwesomeIcon icon={faUser} className="login-button-icon" />
          <span className="login-text">{isLoggedIn ? '로그아웃' : '로그인'}</span>
        </button>
      </div>

      {/* 로고 */}
      <div className="nav-section" onClick={clickNav}>
        <img
          width={150}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/709px-H%26M-Logo.svg.png"
          alt="H&M Logo"
        />
      </div>

      {/* 메뉴 */}
      <div className="navbar-container">
        <button className="menu-btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        <div className={`menu-area ${isMenuOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            {menuList.map((menu, index) => (
              <li key={index}>{menu}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 검색창 */}
      <div className="menu-search">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="제품검색"
          onKeyDown={search}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Navbar;
