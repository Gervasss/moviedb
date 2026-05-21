import styled from '@emotion/styled';

type SidebarProps = {
  darkMode: boolean;
};

export const Sidebar = styled.div<SidebarProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  overflow: hidden;

  background: #111116;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.50);

  color: rgba(255, 255, 255, 0.90);
  transition: none;

  .movie-logo {
    border-radius: 14px;
    object-fit: contain;
    display: block;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: rgba(226, 160, 51, 0.08);
  }

  .admin-buttons {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    
  
  }

  .admin-buttons .buttons .sideButton {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(255, 255, 255, 0.52);
    font-size: 13px;
    line-height: 1;
    font-weight: 500;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease, border-color 140ms ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.88);
      border-color: rgba(255, 255, 255, 0.07);
      transform: none;
      box-shadow: none;
    }

    &.active {
      background: rgba(226, 160, 51, 0.12);
      color: #e2a033;
      border-color: rgba(226, 160, 51, 0.28);
      box-shadow: none;
    }
  }

  .sideButtonContent {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-Sidebar {
    width: 20px;
    height: 20px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .icon-Sidebar svg {
    width: 1em;
    height: 1em;
    display: block;
  }

  .title-Sidebar {
    flex: 1;
    text-align: left;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .switch {
    margin-left: 0;
    margin-top: auto;
    padding-top: 16px;
    filter: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
`;
