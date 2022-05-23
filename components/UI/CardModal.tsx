import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';

export type CardModalProps = {
  active: boolean;
  closeEvent: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  children: React.ReactNode;
  actionMsg: string;
  actionEvent?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const CardModal = ({
  closeEvent,
  title,
  children,
  actionMsg,
  actionEvent,
}: CardModalProps) => {
  return (
    <>
      <CardModalContainer>
        <h3>{title}</h3>
        <div className="msg">{children}</div>
        <div className="action_box"></div>
      </CardModalContainer>
    </>
  );
};

CardModal.defaultProps = {
  active: false,
};

const Button = styled.div``;
const CardModalContainer = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .msg {
    line-height: 1.5;
    font-size: 1rem;
    color: rgb(73, 80, 87);
    margin-top: 1rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }

  .action_box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      margin-left: 0.5rem;
    }
  }
`;

export default CardModal;
