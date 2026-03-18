import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
    base: '/vueblog/',
    lang: 'zh-CN',
    title: 'Marble\'s blog',
    description: '技术博客',
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar: [
            { text: 'Home', link: '/' },
            { text: 'java', link: '/zh/java/' },
            { text: 'redis', link: '/redis/' },
            { text: 'CI/CD', link: '/cicd/' },
            { text: '网络', link: '/network/' },
            { text: '存储', link: '/store/' },
            { text: 'k8s', link: '/k8s/' },
            { text: 'linux', link: '/linux/' },
            { text: '规范', link: '/standard/' },
            { text: '百度一下', link: 'https://www.baidu.com' },
            { text: 'google', link: 'https://www.google.com' },
        ],
        sidebar: {
            '/cicd/': [
                '',
                'devops',
            ],
            '/redis/': [
                '',
                'aof',
                'rdb'
            ],
            '/store/': [
                '',
                'ceph',
                {
                    text: '第1单元-快速入门',
                    collapsible: true,
                    children: [
                        '第1单元-快速入门/Ceph分布式存储'
                    ]
                },
                {
                    text: '第2单元-核心实践',
                    collapsible: true,
                    children: [
                        '第2单元-核心实践/Ceph分布式存储'
                    ]
                },
                {
                    text: '第3单元-综合实践',
                    collapsible: true,
                    children: [
                        '第3单元-综合实践/Ceph分布式存储'
                    ]
                }
            ],
            '/standard/': [
                '',
                'design',
            ],
            '/network/': [
                '',
                'base',
            ],
            '/k8s/': [
                '',
            ],
            '/linux/': [
                '',
            ],
            '/design/': [
                '',
            ],
            '/zh/guide/': [
                '',
            ],
            '/zh/java/': [
                '',
            ],
        }
    })
})
