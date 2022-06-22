import styled from "styled-components";

export const Styles = styled.div`
  .center-header {
    max-width: 1232px;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    display: flex;
    color: rgba(0, 0, 0, 0.84);
    height: 80px;
    @media (max-width: 1280px) {
      max-width: 960px;
      padding-left: 16px;
      padding-right: 16px;
    }
    .logo {
      margin-right: 16px;
    }
    .desktop {
      display: flex;
      min-width: 0;
      min-height: 0;
      height: 40px;
      margin-right: 16px;
      margin-left: auto;
      align-items: center;
      justify-content: flex-end;
      .header-expand {
        box-sizing: border-box;
        min-width: 0;
        min-height: 0;
        height: 40px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-left: 16px;
        flex-shrink: 0;
        position: relative;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5rem;
        & svg {
          flex: 0 0 auto;
          display: inline-block;
          font-size: inherit;
          vertical-align: middle;
          margin-left: 2px;
          margin-right: 2px;
          width: 8px;
          height: 16px;
          padding: 4px;
        }
        &:hover {
          opacity: 0.8;
        }
      }
      .header-link {
        margin-top: 0;
        margin-bottom: 0;
        cursor: pointer;
        line-height: 40px;
        display: block;
        color: inherit;
        padding-left: 16px;
        padding-right: 16px;
        font-weight: 600;
        font-size: 1rem;
        line-height: 40px;
        &:hover {
          opacity: 0.8;
        }
      }
      @media (max-width: 1280px) {
        display: none;
      }
    }
    .action {
      display: flex;
      box-sizing: border-box;
      min-width: 0;
      min-height: 0;
      height: 40px;
      margin-left: auto;
      flex-shrink: 0;
      align-items: center;
      .login-desktopview {
        min-width: 100px;
        margin: 0px 16px;
        max-height: 1e7px;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5rem;
        display: block;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        background: none;
        border: none;
        padding: 0px;
      }
      .header-expand {
        box-sizing: border-box;
        min-width: 0;
        min-height: 0;
        height: 40px;
        padding-top: 8px;
        padding-bottom: 8px;
        flex-shrink: 0;
        position: relative;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5rem;
        & svg {
          flex: 0 0 auto;
          display: inline-block;
          font-size: inherit;
          vertical-align: middle;
          margin-left: 2px;
          margin-right: 2px;
          width: 8px;
          height: 16px;
          padding: 4px;
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .nav-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 0px;
      top: 40px;
      align-items: flex-start;
      background-color: white;
      padding-top: 8px;
      padding-bottom: 8px;
      border-radius: 6px;
      box-shadow: 0px 1px 8px 0px rgb(65 65 139 / 8%), 0px 3px 4px 0px rgb(65 65 139 / 6%), 0px 3px 3px -2px rgb(65 65 139 / 4%);
      & div {
        display: block;
        padding: 8px 16px;
        appearance: none;
        text-decoration: none;
        white-space: nowrap;
        text-align: left;
        color: rgba(0, 0, 0, 0.84);
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
`;
