import styled, { keyframes } from "styled-components";
import { bounceInUp } from "react-animations";
const bounceAnimation = keyframes`${bounceInUp}`;

export const Styles = styled.div`
  display: flex;
  padding-top: 59px;
  .location-container {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    .first-animation {
      animation: 2s ${bounceAnimation};
    }
    .second-animation {
      animation: 3s ${bounceAnimation};
    }
    .third-animation {
      animation: 4s ${bounceAnimation};
    }
    .four-animation {
      animation: 5s ${bounceAnimation};
    }
    .five-animation {
      animation: 6s ${bounceAnimation};
    }
    .six-animation {
      animation: 7s ${bounceAnimation};
    }
    .seven-animation {
      animation: 8s ${bounceAnimation};
    }
    .eight-animation {
      animation: 9s ${bounceAnimation};
    }
    .nine-animation {
      animation: 10s ${bounceAnimation};
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
    .alarm {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 49px;
      width: 551px;
      padding-left: 38px;
      background-color: #d4e7ff;
      border-radius: 6px;
      font-family: "SourceSansPro-Regular";
      font-size: 16px;
      font-weight: 400;
      color: #505050;
      @media (max-width: 650px) {
        width: calc(100% - 32px);
        padding: 0px 16px;
        height: 29px;
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
    .salary-block {
      margin-top: 14px;
      margin-bottom: 17px;
    }
    .email-title {
      padding-top: 25px;
      padding-bottom: 15px;
      font-family: "SourceSansPro-Semibold";
      font-size: 18px;
      color: #505050;
    }
    .address-list {
      padding-top: 24px;
      width: 589px;
      .address-item {
        height: 40px;
        width
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
    .detail-footer {
      max-width: 589px;
      font-family: "SourceSansPro-Light";
      font-size: 18px;
      font-weight: 300;
      color: #505050;
      margin-bottom: 20px;
      @media (max-width: 650px) {
        font-size: 13px;
      }
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
