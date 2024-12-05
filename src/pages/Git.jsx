import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Tab, Tabs} from 'react-bootstrap'
import axios from 'axios'

const Git = () => {
    const [repo, setRepo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [languages, setLanguages] = useState([]);

    //git 레포지토리 가져오기
    const getRepos = async ()=> {
        setLoading(true);
        setError(null);
        try{
            const res = await axios.get("https://api.github.com/users/parkminjung-als/repos");
            console.dir(res.data);
            setRepo(res.data);

            //언어 목록 추출
            const langs = Array.from(new Set (res.data.map((repo)=>repo.languages).filter(Boolean)));
            setLanguages(langs);
        }catch(err){
            setError("에러가 발생했습니다.");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getRepos();
    }, []);
  return (
    <Container>
        <Row>
            <Col>
                {loading && <p>loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error &&(
                    <Container className="mt-5">
                        <Tabs defaultActiveKey={"all"}>
                            <Tab eventKey={"all"} title="all">
                                <Row className="pt-5">
                                    <Col md="3">
                                        <div class="repobox">dsf</div>
                                    </Col>
                                    <Col md="3">
                                        <div class="repobox">dsf</div>
                                    </Col>
                                    <Col md="3">
                                        <div class="repobox">dsf</div>
                                    </Col>
                                    <Col md="3">
                                        <div class="repobox">dsf</div>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey={"html"} title="html">html</Tab>
                            <Tab eventKey={"java"} title="java">java</Tab>
                        </Tabs>
                    </Container>
                )}
                <ul>
                    {repo.map((r)=> (
                        <li key={r.id}>
                            <a href={r.html_url} target="_blank">
                                {r.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </Col>
        </Row>
    </Container>
  )
}

export default Git