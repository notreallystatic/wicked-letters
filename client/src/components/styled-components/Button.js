import React from 'react';
import { applyStyleModifiers } from 'styled-components-modifiers';
import styled from 'styled-components';
import { typeScale, primaryFont } from '../../utils';

export const BUTTON_MODIFIERS = {
  small: () => `
    padding: 4px;
    font-size: ${typeScale.helperText};
  `,
  large: () => `
    padding: 16px 24px; 
    font-size: ${typeScale.header5};
  `,
  warning: ({ theme }) => `
    background-color: ${theme.status.warningColor};
    color: ${theme.textColorInverted};
    &:hover, &:focus {
      background-color: ${theme.status.warningColorHover};
    }
    &:focus {
      outline: 3px solid ${theme.status.warningColorHover};
    }
    &:active {
      background-color: ${theme.status.warningColorActive};
    }
    `,
  error: ({ theme }) => `
    background-color: ${theme.status.errorColor};
    color: ${theme.textColorInverted};
    
    &:hover {
      background-color: ${theme.status.errorColorHover};
    }
    
    &:focus {
      outline: 3px solid ${theme.status.errorColorActive};
      outline-offset: 2px;
    }
    
    &:active {
      background-color: ${theme.status.errorColorActive};
    }
    `,
  success: ({ theme }) => `
    background-color: ${theme.status.successColor};
    color: ${theme.textColorInverted};
    
    &:hover {
      background-color: ${theme.status.successColorHover};
    }
    
    &:focus {
      outline: 3px solid ${theme.status.successColorHover};
      outline-offset: 2px;
    }
    
    &:active {
      background-color: ${theme.status.successColorActive};
    }
    `,
};

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: ${primaryFont};
  font-size: ${typeScale.paragraph};
  &:hover {
    background-color: ${(props) => props.theme.primaryHoverColor};
    color: ${(props) => props.theme.textColorOnPrimary};
  }
  &:focus {
    outline: 3px solid ${(props) => props.theme.primaryHoverColor};
    outline-offset: 2px;
  }
  &:active {
    background-color: ${(props) => props.theme.primaryActiveColor};
    color: ${(props) => props.theme.textColorOnPrimary};
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColorOnPrimary};
  border: 2px solid transparent;
  &:disabled {
    background-color: ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.textOnDisabled};
    cursor: not-allowed;
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;

export const SecondaryButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.primaryColor};
  background: none;
  color: ${(props) => props.theme.primaryColor};
  &:disabled {
    background: none;
    border: 2px solid ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.disabled};
    cursor: not-allowed;
  }
  &:hover {
    border: 2px solid ${(props) => props.theme.primaryHoverColor};
  }
  &:active {
    border: 2px solid ${(props) => props.theme.primaryActiveColor};
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;

export const TertiaryButton = styled(Button)`
  background: none;
  border: 2px solid transparent;
  color: ${(props) => props.theme.primaryColor};
  &:disabled {
    color: ${(props) => props.theme.disabled};
    cursor: not-allowed;
  }
  &:hover:disabled {
    color: white;
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`;

export const IconButton = styled(Button)`
  min-width: auto;
  border: 2px solid transparent;
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
