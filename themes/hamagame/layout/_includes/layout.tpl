<!doctype html>
<html lang="zh-cmn-Hans">
<head>
    {% include "./head/head.tpl" %}
    {% block head %}{% endblock %}
    <title>
        {{ config.title }}{% block title %}{% endblock %}
    </title>
</head>
<body>
{% block body %}{% endblock %}
</body>
</html>
