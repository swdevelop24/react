import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'



// const Navbar = () => {
//     const menuList = ['여성',
//         'Divided',
//         '남성',
//         '신생아/유아',
//         '아동',
//         'H&M Home',
//         'Sale',
//         '지속가능성'];


//     const navigate = useNavigate();

//  // 로그인 상태 확인
//  const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem('isLoggedIn') === 'true'
//   );



//     const search = (event) => {
//         console.log("key press");
//         if (event.key === "Enter") {
//             // console.log("we click this key", event.key);
//             // 입력한 검색어를 읽어와서 
//             let keyword = event.target.value;
//             console.log("keyword", keyword);

//             //url을 바꿔준다
//             navigate(`/?q=${keyword}`)


//         }
//     }

//     const clickNav=(() =>{
//         navigate('/')
//     })


//     return (
//         <div>
//             <div>
//                 <div className="login-button" >
//                     <FontAwesomeIcon icon={faUser} className='login-button-icon' />
//                     <div>{isLoggedIn ? '로그아웃' : '로그인'}</div>
//                 </div>
//             </div>
//             <div className='nav-section' onClick={clickNav}>
//                 <img width={150} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/709px-H%26M-Logo.svg.png" />
//             </div>

//             <div className='menu-area'>
//                 <ul className="menu-list">
//                     {menuList.map((menu) => (
//                         <li>{menu}</li>
//                     ))}
//                 </ul>
//                 <div className='menu-search'>
//                     <FontAwesomeIcon icon={faSearch} className="search-icon" />
//                     <input type="text" placeholder="제품검색" onKeyDown={search}></input>

//                 </div>

//             </div>
//         </div>
//     )
// }

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

    const handleLoginLogout = () => {
        // 로그아웃 상태일 때는 버튼 클릭 무시
        if (!isLoggedIn) {
            navigate('/login')
            return; // 로그아웃 상태에서는 로그인 페이지로 이동만 하고 아무것도 하지 않음
        }

        // 로그인/로그아웃 상태 변경
        const newLoginStatus = !isLoggedIn;
        setAuthenticate(newLoginStatus);

        if (newLoginStatus) {
            // 로그인 성공 시 localStorage에 true 저장
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/'); // 로그인 후 메인 페이지 이동
        } else {
            // 로그아웃 시 localStorage 값 제거
            localStorage.removeItem('isLoggedIn');
            navigate('/'); // 로그아웃 후 메인 페이지 이동
        }
    };

    // 검색 기능
    const search = (event) => {
        if (event.key === 'Enter') {
            let keyword = event.target.value;
            console.log('검색어:', keyword);
            navigate(`/?q=${keyword}`);
        }
    };

    // 로고 클릭 시 메인 페이지 이동
    const clickNav = () => {
        navigate('/');
    };


    // 메뉴 상태 (모바일에서만 열림/닫힘)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 메뉴 열기/닫기 핸들러
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div>
            <div>
                {/*로그인/로그아웃 버튼 */}
                <div className="login-button" onClick={handleLoginLogout}>
                    <FontAwesomeIcon icon={faUser} className="login-button-icon" />
                    <div>{isLoggedIn ? '로그아웃' : '로그인'}</div>
                </div>
            </div>

            {/* 로고 섹션 */}
            <div className="nav-section" onClick={clickNav}>
                <img
                    width={150}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/709px-H%26M-Logo.svg.png"
                    alt="H&M Logo"
                />
            </div>

            {/*  메뉴 영역 */}
            <div className="menu-area">
                {/* 햄버거 버튼 - 모바일에서만 보임 */}
                <button className="menu-btn" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                {/* 모바일에서는 햄버거 버튼으로 메뉴 보이기 */}
                <ul className={`menu-list ${isMenuOpen ? 'show' : ''}`}>
                    {menuList.map((menu, index) => (
                        <li key={index}>{menu}</li>
                    ))}
                </ul>
            </div>

            {/*  검색 기능 */}
            <div className="menu-search">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" onKeyDown={search} />
            </div>
        </div>

    );
};


export default Navbar
