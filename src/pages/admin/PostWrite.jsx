import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import Wysiwyg from '../../components/write/Wysiwyg';
import FileUploadService from '../../components/write/FileUploadService';

const PostWrite = () => {
  
  const navigate = useNavigate();
  const [ categories, setCategories] = useState([]);
  const [ post, setPost ] = useState('');
  const [ selectedCategory, setSelectedCategory] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [inputHashTag, setInputHashTag] = useState('');
  const [hashTags, setHashTags] = useState([]);
  const [files, setFiles] = useState([]);
  const [ntime] = useState(Date.now());

  const viewCategories = async() => {
     try{
        const res = await axios.get('/api/categories');
        setCategories(res.data);
     }catch(error){
        console.error('Error', error);
     }
  } 

  //포스트 (띄어쓰기를 _ 로 변환)
  const handlePostChange = (e) => {
     const value = e.target.value.replace(/\s+/g, "_");
     setPost(value);
  }

  //카테고리 변경
  const handleCategoryChange = (e)=>{
      setSelectedCategory(e.target.value);
  }

  const handleTitle = (e) => {
      setPostTitle(e.target.value);
  }

 
  //빈 값 확인
  const isEmptyValue = (val) => {
   return (
      val === null || 
      val === undefined || 
      (typeof val ==='string' && val.trim()==='') ||
      (Array.isArray(val) && val.length === 0) ||
      (typeof val === 'object' && Object.keys(val).length === 0)
   )
  }

  const addHashTag = (e)=> {
     const allowdCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
     const regExp = /[{}[\]/?,;:|)*~`!^\-_+<>@#$%&\\=('"]/g;
     
     if(!allowdCommand.includes(e.code)) return;
     if( isEmptyValue(e.target.value.trim())){
        return setInputHashTag('');
     }
     
     let newHashTag = e.target.value.trim();

     //5개 이상이면 alert
     if(hashTags.length >= 5) {
        alert("최대 5개의 해시태그만 등록할 수 있어요.");
        return setInputHashTag('');
     }

     //특수문자 제거하기
     if(regExp.test(newHashTag)){
        newHashTag = newHashTag.replace(regExp, '');
     }

     //쉼표 제거하기
     if(newHashTag.includes(',')){
        newHashTag = newHashTag.split(",").join('');
     }
 
     //#붙이기
     if(!newHashTag.startsWith("#")){
        newHashTag = `#${newHashTag}`;
     }

     if(!newHashTag || newHashTag === "#") return;

     if( isEmptyValue(newHashTag)) return;

     setHashTags((prevHashTags)=>(
         [...new Set([...prevHashTags, newHashTag])]
     ))

     setInputHashTag('');
  }

  const changeHashTagInput = (e) => { setInputHashTag(e.target.value);}
  const keyDownHandler = (e) => {
     if(e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
     e.preventDefault();
  }

  useEffect(()=>{
    viewCategories();
  }, []);

  //폼 제출
  const handleSubmit = async (e) => {
     e.preventDefault();
     if(!post || !selectedCategory || !postTitle || !postContent) {
        alert("모든 필드를 입력해 주세요");
        return;
     }

     const formData = new FormData();
     formData.append('post', post);
     formData.append('category', selectedCategory);
     formData.append('title', postTitle);
     formData.append('content', postContent);
     formData.append('hashtag', hashTags.join(','));
     formData.append('ntime', ntime);

     try{
        await axios.post('http://localhost:8080/api/posts', formData, {
            headers : {
               'Content-Type' : 'application/json'
            }
        });
        alert("정상적으로 저장 되었습니다.");
        navigate(`/api/posts/${post}`);
     }catch(error){
        console.error('에러가 발생했습니다.', error);
        alert("포스트 저장 중 오류가 발생했습니다.");
     }
  }

  return (
    <Container>
      <h3 className="pt-5 text-center">포스팅</h3> 
      <form onSubmit={handleSubmit}>
      <Row className="mt-5">
        <Col md="2" className="text-end">포스트</Col>
        <Col md="10">
           <input type="text" 
                  className="form-control" 
                  name="post" 
                  value={post} 
                  onChange={handlePostChange}
                  required
                  />
        </Col>  
        <Col md="2" className="mt-3 text-end">카테고리</Col>
        <Col md="10" className="mt-3">
           <select 
              name="category" 
              className="form-control category"
              value={selectedCategory}
              onChange={handleCategoryChange}>
              <option value="">카테고리선택</option>
              {
                 categories.map((cate)=>(
                   <option key={cate.id} value={cate.title}>
                      {cate.title}
                   </option> 
                 ))               
              }
           </select> 
        </Col>    

        <Col md="2" className="mt-3 text-end">제목</Col>
        <Col md="10" className="mt-3">
           <input 
              type="text" 
              name="title" 
              className="form-control" 
              value={postTitle} 
              onChange={handleTitle} />
        </Col>  
        <Col md='2' className="mt-3 text-end">내용</Col>
        <Col md="10" className="mt-3">
           <Wysiwyg content={postContent}
                    setContent={setPostContent}
                    ntime = { ntime }
           />         
        </Col>
        <Col md="2" className="mt-3 text-end">해시태그</Col>
        <Col md="10" className="mt-3">
           <div className="hashtag">
              <div className="hashTagbox">
                  {
                     hashTags.length>0 &&
                     hashTags.map(hash => (
                        <span key={hash.id} className='tag'>
                           {hash}
                        </span>
                     ))
                  }
                  <input value={inputHashTag}
                         onChange={changeHashTagInput}
                         onKeyUp={addHashTag}
                         onKeyDown={keyDownHandler}
                         placeholder="#해시태그 등록(최대5개)"
                         className="hashTagInput"
                  />       
              </div>
           </div> 
        </Col>    
        <Col md="2" className="mt-3 text-end">파일업로드</Col>
        <Col md="10" className="mt-3">
            <FileUploadService nitime={ntime} 
                               onFileUploadComp = {(urls)=>{
                                  console.log('파일경로 : ', urls);
                               }}
            />                   
        </Col>       
      </Row>
      <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary">저장</button>
      </div>
      </form>
    </Container>    
  )
}

export default PostWrite