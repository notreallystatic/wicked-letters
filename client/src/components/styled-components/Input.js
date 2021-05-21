import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  background: ${(props) => props.theme.textFieldBackground};
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  width: 100%;

  &:active {
    text-decoration: none;
    filter: drop-shadow(1px 1px 8px #5d3665);
  }

  &:focus {
    outline: none;
    filter: drop-shadow(1px 1px 8px #5d3665);
  }
`;
