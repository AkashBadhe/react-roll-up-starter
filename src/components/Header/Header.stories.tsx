// Header.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Header, { HeaderProps } from './Header';

export default {
    title: 'Components/Header',
    component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args: HeaderProps) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
    logoText: 'Default Logo',
    links: [
        { title: 'Home', url: '/home' },
        { title: 'About', url: '/about' },
        { title: 'Contact', url: '/contact' },
    ],
};

export const WithImageLogo = Template.bind({});
WithImageLogo.args = {
    logo: 'https://example.com/logo.png',
    links: [
        { title: 'Home', url: '/home' },
        { title: 'About', url: '/about' },
        { title: 'Contact', url: '/contact' },
    ],
};

export const WithTextLogo = Template.bind({});
WithTextLogo.args = {
    logoText: 'Custom Logo',
    links: [
        { title: 'Home', url: '/home' },
        { title: 'About', url: '/about' },
        { title: 'Contact', url: '/contact' },
    ],
};