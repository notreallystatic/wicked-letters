import React from 'react';
import styled from 'styled-components';

export const Label = styled.label`
  font-size: 14px;
  color: ${(props) => props.theme.textFieldLabelColor};
  margin: 0px;
  max-width: 100%;
`;
