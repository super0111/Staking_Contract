import styled from "styled-components";

export const Styles = styled.div`
  .progress-container {
    max-width: 1232px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 1280px) {
      max-width: 960px;
      padding-left: 16px;
      padding-right: 16px;
    }
    .steper-title {
      font-family: SourceSansPro-Semibold;
      font-size: 22px;
      font-weight: 600;
      padding: 24px 0px 18px 0px;
      @media (max-width: 800px) {
        text-align: center;
      }
    }
    .progress-steper {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      min-width: 0px;
      min-height: 0px;
      padding-top: 8px;
      padding-bottom: 8px;
      align-items: center;
      @media (max-width: 800px) {
        justify-content: center;
        gap: 10px;
      }
      & li {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        min-width: 0px;
        min-height: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        cursor: pointer;
        max-height: 1e7px;
        font-weight: 300;
        font-size: 0.875rem;
        line-height: 1.375rem;
        color: rgba(0, 0, 0, 0.84);
        & svg {
          margin: 0px 4px;
          padding: 4px 6px;
        }
        & strong {
          font-family: SourceSansPro-Semibold;
          font-size: 20px;
          font-weight: 600;
          @media (max-width: 650px) {
            font-size: 14px;
          }
        }
        & span {
          font-family: SourceSansPro-Regular;
          font-size: 20px;
          font-weight: 400;
          @media (max-width: 650px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
