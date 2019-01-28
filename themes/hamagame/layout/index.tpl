{% extends "./_includes/content/content.tpl" %}
{% block style %}
    <link rel="stylesheet" href="/style/index.css">
{% endblock %}
{% block script %}
    <script defer src="/script/index.min.js"></script>
{% endblock %}
{% block content %}
    <div id="articles">
        {% for data in getContent() %}
            {% set cardClass = "card tooltip " + data.type %}
            <div class="{{ cardClass }}" data-href="{{ data.link }}"
                 title="{{ data.title }} {{ formatDateStd(data.timestamp) }}">
                <div class="content">
                    {% if data.type === "article" %}
                        {{ data.content }}
                    {% endif %}
                    {% if data.image %}
                        <img class="lazyload" data-src="{{ data.image }}" alt="{{ data.title }}">
                    {% endif %}
                </div>
                <a class="title {% if startsWith(data.title,'【') %} indent {% endif %}" href="{{ data.link }}"
                   rel="noopener" target="_blank">
                    {{ data.title }}
                </a>
                <small class="desc">
                    {{ "开播" if data.type === "live" else "投稿" }}时间：{{ formatDate(data.timestamp) }}
                </small>
            </div>
        {% endfor %}
    </div>
{% endblock %}
