import styled, { keyframes } from "styled-components";
import { bounceInUp } from "react-animations";
const bounceAnimation = keyframes`${bounceInUp}`;

export const Styles = styled.div`
  display: flex;
  padding-top: 59px;
  .project-container {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    .animation-0 {
      animation: 2s ${bounceAnimation};
    }
    .animation-1 {
      animation: 3s ${bounceAnimation};
    }
    .animation-2 {
      animation: 4s ${bounceAnimation};
    }
    .animation-3 {
      animation: 5s ${bounceAnimation};
    }
    .animation-4 {
      animation: 6s ${bounceAnimation};
    }
    .animation-5 {
      animation: 7s ${bounceAnimation};
    }
    .animation-6 {
      animation: 8s ${bounceAnimation};
    }
    .question {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 63px;
      width: 551px;
      padding-left: 38px;
      background-color: #eaf3ff;
      border-radius: 6px;
      font-family: "SourceSansPro-Regular";
      font-size: 16px;
      font-weight: 400;
      color: #505050;
      @media (max-width: 650px) {
        width: calc(100% - 32px);
        padding: 0px 16px;
        height: 34px;
        font-size: 12px;
      }
      & span {
        font-family: "SourceSansPro-Regular";
        font-size: 16px;
        font-weight: 400;
        @media (max-width: 650px) {
          font-size: 12px;
        }
      }
      & strong {
        font-family: "SourceSansPro-Semibold";
        font-size: 16px;
        font-weight: 600;
        @media (max-width: 650px) {
          font-size: 12px;
        }
      }
    }
    .period-list {
      width: 589px;
      @media (max-width: 650px) {
        width: 100%;
      }
      .radio-btn {
        text-transform: none;
        font-family: "SourceSansPro-Regular";
        font-size: 18px;
        font-weight: 400;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.24);
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 19px;
        height: 63px;
        cursor: pointer;
        @media (max-width: 650px) {
          font-family: "SourceSansPro-Light";
          font-size: 14px;
          font-weight: 300;
          height: 34px;
        }
        & svg {
          padding-left: 37px;
        }
        & span {
          padding-left: 14px;
        }
      }
      .clicked {
        font-family: "SourceSansPro-Semibold";
        font-size: 18px;
        font-weight: 600;
        border: 1px solid rgb(52, 84, 209);
        color: rgb(52, 84, 209);
        @media (max-width: 650px) {
          font-size: 14px;
        }
      }
    }
    .required {
      color: #b71c1c;
      border-color: #ef9a9a;
      background-color: #ffcdd2;
      padding: 8px 12px;
      font-size: 0.875rem;
      margin-top: 8px;
      line-height: 1.125rem;
      margin-left: 0;
      border-style: solid;
      border-width: 1px;
      margin-right: 0;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .color-button {
      color: #ffffff;
      font-family: "SourceSansPro-Bold";
      font-size: 18px;
      font-weight: 700;
      width: "100%";
      height: "49px";
      border-radius: 6px;
      cursor: pointer;
      line-height: "24px";
      background-color: #3454d1;
      margin-bottom: 28px;
      transition: ".3s ease";
      text-transform: none;
      &:hover {
        opacity: 0.7;
      }
      @media (max-width: 650px) {
        font-family: "SourceSansPro-Semibold";
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;
