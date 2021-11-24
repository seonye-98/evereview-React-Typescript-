import React from "react";
import ROUTES from "../../../constants/routes";
import styles from "./SignUp2.module.scss";
import classNames from "classnames/bind";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";

const cx = classNames.bind(styles);

function SignUp2(props: any) {
  const history = useHistory();
  const name = useSelector<ReducerType>((state) => state.user.name);

  const clickEventHandler = (e: any) => {
    e.preventDefault();
    props.onSubmit("3");
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("title")}>
            <div className={cx("pencilLogo")}>
              <UilEditAlt size="80" />
            </div>
            <div className={cx("titleText")}>EverReview</div>
          </div>

          <div className={cx("stepContainer")}>
            <div className={cx("stepBox")}>1</div>
            <div className={cx("link")}></div>
            <div className={cx("nowStepBox")}>2</div>
            <div className={cx("link")}></div>
            <div className={cx("stepBox")}>3</div>
            <div className={cx("link")}></div>
            <div className={cx("stepBox")}>4</div>
          </div>
          <p>안녕하세요, {`${name}`}님 !</p>

          <p>간단한 정보 입력을 통해 서비스 이용을 시작해보세요!</p>

          <button className={cx("btn")} onClick={clickEventHandler}>
            정보 입력하러 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp2;
