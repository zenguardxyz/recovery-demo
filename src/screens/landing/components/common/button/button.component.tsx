// eslint-disable-file no-use-before-define
import React from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
	padding: 1.4rem;
	min-width: 160px;
	font-weight: 600;
	font-size: 16px;
	color: #fff;
	background: #7CC562;
	border-radius: 5px;
	cursor: pointer;
`;

export interface ButtonComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonComponentProps> = ({
  children,
  ...rest
}) => <StyledButton {...rest}>{children}</StyledButton>;
