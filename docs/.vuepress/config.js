import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'Marble\'s blog',
    description: '技术博客',
    bundler: viteBundler(),
    plugins: [
        searchPlugin({
            // 排除首页
            exclude: ['/'],
        }),
    ],
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
            { text: '设计模式', link: '/design/' },
            { text: '开发工具', link: '/tools/' },
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
                'iscsi',
                'ceph-rbd-iscsi-overview',
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
                { text: 'vueblog 维护流程', link: 'vueblog-maintain' },
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
                // 创建型
                'simple-factory',
                'factory-method',
                'abstract-factory',
                'builder',
                'prototype',
                'singleton',
                // 结构型
                'adapter',
                'bridge',
                'composite',
                'decorator',
                'facade',
                'flyweight',
                'proxy',
                // 行为型
                'chain-of-responsibility',
                'command',
                'iterator',
                'mediator',
                'memento',
                'observer',
                'state',
                'strategy',
                'template-method',
                'visitor',
                'interpreter',
            ],
            '/tools/': [
                '',
                'opencode',
                'vibe-coding-ai-coding',
            ],
            '/zh/java/': [
                {
                    text: 'Java 分类',
                    collapsible: true,
                    children: [
                        '',
                    ]
                },
                {
                    text: 'Java 新特性',
                    collapsible: true,
                    prefix: 'features/',
                    children: [
                        'java8',
                        'java9-11',
                        'java17',
                    ]
                },
                {
                    text: 'JVM',
                    collapsible: true,
                    prefix: 'jvm/',
                    children: [
                        'memory-model',
                        'garbage-collection',
                        'jvm-tuning',
                        'class-loading',
                    ]
                },
                {
                    text: '并发编程',
                    collapsible: true,
                    prefix: 'concurrent/',
                    children: [
                        'basics',
                        'thread-pool',
                        'locks',
                        'synchronizers',
                        'atomic',
                    ]
                },
                {
                    text: 'Spring 生态',
                    collapsible: true,
                    prefix: 'spring/',
                    children: [
                        'spring-ioc',
                        'spring-aop',
                        'spring-boot',
                        'spring-common-annotations',
                    ]
                },
                {
                    text: 'ORM & 数据库',
                    collapsible: true,
                    prefix: 'orm/',
                    children: [
                        'jdbc',
                        'mybatis',
                        'jpa-hibernate',
                    ]
                },
                {
                    text: '网络编程',
                    collapsible: true,
                    prefix: 'network/',
                    children: [
                        'io-bio-nio',
                        'netty',
                    ]
                },
                {
                    text: '集合框架',
                    collapsible: true,
                    prefix: 'collections/',
                    children: [
                        'overview',
                        'list-vs-set',
                        'map-implementations',
                    ]
                },
            ],
        }
    })
})
