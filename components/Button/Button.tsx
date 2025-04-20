import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  size: 'small' | 'medium' | 'large';
}

export const Button = React.memo(({ title, size, style, ...props }: ButtonProps) => {
  const titleStyle = {
    small: styles.smallTitle,
    medium: styles.mediumTitle,
    large: styles.largeTitle,
  }
  
  return (
    <TouchableOpacity style={[styles.base, styles[size], style]} activeOpacity={0.9} {...props}>
      <Text style={[styles.baseTitle, titleStyle[size]]}>{title}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    borderRadius: 26,
    paddingHorizontal: 12,
    height: 30,
  },
  medium: {
    borderRadius: 100,
    paddingHorizontal: 24,
    height: 43,
  },
  large: {
    height: 50,
    borderRadius: 100,
    paddingHorizontal: 30,
  },
  baseTitle: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  smallTitle: {
    fontSize: 13,
  },
  mediumTitle: {
    fontSize: 12,
  },
  largeTitle: {
    fontSize: 16,
  },
})