import React, { Fragment, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navbar, Sidebar } from "../../../Components/common";
import SearchBar from "../../../Components/SearchBar/SearchBar/SearchBar";
import classNames from "classnames/bind";
import { nowCategory } from "../../../store/modules/category";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import { actions } from "../../../store/modules";
import NegBarChart from "../../../Components/barChart/NegBarChart";
import NegLineChart from "../../../Components/LineChart/NegLineChart";
import axios from "axios";
import { nowAllTenArray, nowAnalysis, nowClusterData, nowNegFiveArray } from "store/modules/analysis";
import { nowVideoList } from "store/modules/videos";
import { nowSelectedVideoList } from "store/modules/selectedVideo";
import styles from "./NegFeedBackPage.module.scss";
import { Hypnosis } from "react-cssfx-loading";
const cx = classNames.bind(styles);

function NegFeedBackPage() {
  const [thisData, setThisData] = useState([]);
  const [thissData, setThissData] = useState([]);
  const [clusterData, setClusterData] = useState([]);
  const [sortByViewCount, setSortByViewCount] = useState([]);
  const [isSelectedCommentArray, setIsSelectedCommentArray] = useState(false);
  const nowNegFive = useSelector(nowNegFiveArray);
  const isAnalysis = useSelector(nowAnalysis);
  const nowLoading = useSelector(nowAnalysis).loading;
  const isCluster = useSelector(nowClusterData);
  const isNowVideo = useSelector(nowVideoList);

  const isSelectedVideoList = useSelector(nowSelectedVideoList);

  const getUserInfo = () => {
    const clusterArray = [];
    const obj = {};
    for (let i = 10; i < 15; i++) {
      const clusterId = isAnalysis?.analysisArray?.clusters[i].id;
      axios
        .get(process.env.REACT_APP_BACKEND_URL + `/api/comments/${clusterId}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          console.log(i);
          obj[i - 10] = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setClusterData([obj]);
    dispatch(actions.setCluster(clusterData));
  };

  async function getFeedBackList() {
    setThisData(nowNegFive);
    setIsSelectedCommentArray(Array.from({ length: nowNegFive.length }, (v, i) => false));
    console.log(nowNegFive.length);
  }

  useEffect(() => {
    getUserInfo();
    getFeedBackList();
  }, []);

  const dispatch = useDispatch();
  const isCategorySelect = useSelector(nowCategory);

  const name = useSelector((state) => state.user.nickName);

  const setVideo = () => {
    dispatch(actions.selectCategory("영상별 분석"));
  };

  const setSelect = (number) => {
    let newArr = [...isSelectedCommentArray];
    newArr[number] = !isSelectedCommentArray[number];
    setIsSelectedCommentArray(newArr);
  };

  return (
    <Fragment>
      <div className={cx("feedBackContainer")}>
        {nowLoading ? (
          <div className={cx("loadingPage")}>
            <Hypnosis color="#0000008f" width="200px" height="200px" />
          </div>
        ) : null}
        <Sidebar id={5} />
        <div className={cx("sideLine")}></div>
        <div className={cx("feedBackWrap")}>
          <div className={cx("feedBackWrapHeader")}>
            <div className={cx("feedBackText")}>
              <div className={cx("feedBackTitle")}>반갑습니다 {name}님!</div>
              <div className={cx("feedBackDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
            </div>
          </div>
          <div></div>
          <div className={cx("feedBackContentWrap")}>
            <Link className={cx("allFeedbackSelect")} to={ROUTES.ALLFEEDBACK} onClick={setVideo}>
              모든 피드백
            </Link>
            <Link className={cx("posFeedbackSelect")} to={ROUTES.POSFEEDBACK} onClick={setVideo}>
              긍정 피드백
            </Link>
            <Link className={cx("negFeedbackSelected")} to={ROUTES.NEGFEEDBACK} onClick={setVideo}>
              부정 피드백
            </Link>
            <div className={cx("feedBackContent")}>
              <div className={cx("feedBackPageSearch")}>
                <SearchBar />
              </div>
              <div className={cx("feedBackPageContainer")}>
                <div className={cx("feedBackPageLeft")}>
                  <div></div>
                  <div></div>
                  <div className={cx("feedBackBarGrpah")}>
                    {isCategorySelect.category === "영상별 분석" ? <NegBarChart /> : <NegLineChart />}
                  </div>
                  <div>
                    <div className={cx("allBarChart")}>
                      {thisData.map((data, i) => {
                        return (
                          <div className={cx("chartWrap")}>
                            <div className={cx("chartLeft")}>{i + 1}.</div>
                            <div className={cx("chartRight")}>
                              {data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 15
                                ? data.name
                                    .replace(/(<([^>]+)>)/gi, "")
                                    .replace(/\n/, "")
                                    .substring(0, 15) + "..."
                                : data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={cx("feedBackPageRight")}>
                  <div></div>
                  <div className={cx("feedBackCommentsContatiner")}>
                    <div className={cx("feedBackCommentsHeader")}>
                      <div>순위</div>
                      <div>피드백</div>
                      <div>총 댓글 수</div>
                      <div>좋아요</div>
                    </div>
                    <div className={cx("feedBackComments")}>
                      {thisData.map((data, i) => {
                        return (
                          <>
                            <div className={cx("feedBackComment")} id={i} onClick={() => setSelect(i)}>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.id}위</div>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.name}</div>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.댓글수} 개</div>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.좋아요수} 개</div>
                            </div>
                            {isSelectedCommentArray[i] ? (
                              <div>
                                <div className={cx("feedBackDetailHeader")}>
                                  <div>댓글이 달린 영상</div>
                                  <div>원래 댓글</div>
                                  <div>댓글 작성 일자</div>
                                  <div>좋아요</div>
                                </div>
                                <div>
                                  {clusterData.map((sortData, j) => {
                                    return (
                                      <div>
                                        {sortData[i].map((sortedData, j) => {
                                          console.log(sortedData);
                                          return (
                                            <div className={cx("feedBackDetail")}>
                                              <div>
                                                {sortedData.video.title.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 15
                                                  ? sortedData.video.title
                                                      .replace(/(<([^>]+)>)/gi, "")
                                                      .replace(/\n/, "")
                                                      .substring(0, 15) + "..."
                                                  : sortedData.video.title.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}
                                              </div>
                                              <div>
                                                {sortedData.text_original.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 15
                                                  ? sortedData.text_original
                                                      .replace(/(<([^>]+)>)/gi, "")
                                                      .replace(/\n/, "")
                                                      .substring(0, 15) + "..."
                                                  : sortedData.text_original.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}
                                              </div>
                                              <div>
                                                {new Date(sortedData.published_at).getFullYear()}년{" "}
                                                {new Date(sortedData.published_at).getMonth() + 1}월{" "}
                                                {new Date(sortedData.published_at).getDate()}일
                                              </div>
                                              <div>{sortedData.like_count} 개</div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NegFeedBackPage;
