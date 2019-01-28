{% extends "./_includes/content/content.tpl" %}
{% block title %} - {{ page.title }}{% endblock %}
{% block style %}
    <link rel="stylesheet" href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css">
    <link rel="stylesheet" href="/style/post.css">
{% endblock %}
{% block script %}
    <script src="/script/post.min.js"></script>
{% endblock %}
{% block content %}
    <header>
        <h1 class="title">{{ page.title }}</h1>
        <div class="desc">
            <span id="post-type">文章类型：{{ page.categories.data[0].name }}</span>
            <span id="create-time" class="tooltip"
                  title="{{ formatDateStd(page.date) }}">创建日期：{{ formatDate(page.date) }}</span>
            <span id="update-time" class="tooltip"
                  title="{{ formatDateStd(page.updated) }}">更新日期：{{ formatDate(page.updated) }}</span>
        </div>
    </header>
    <div class="markdown-body article">
        <hr>
        {{ page.content }}
    </div>
{% endblock %}