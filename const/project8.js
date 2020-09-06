
const API_URL = 'https://api.github.com/repos/facebookincubator/create-react-app/issues?per_page=10';

$.ajaxSetup({
    dataType: 'json'
});

$.get(API_URL, issues => {
    console.log('최근 10개의 이슈:');
    issues
        .map(issue => issue.title)
        .forEach(title => console.log(title));
    console.log('출력이 끝났습니다.');
});

console.log('받아오는 중...');
