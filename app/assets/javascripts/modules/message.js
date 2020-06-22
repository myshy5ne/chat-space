$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message-date">
            <div class="message-date__name">
              ${message.user_name}
            </div>
            <div class="message-date__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-content">
            <p class="message-content">
              ${message.content}
            </p>
            <img class="message-content__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message-date">
            <div class="message-date__name">
              ${message.user_name}
            </div>
            <div class="message-date__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-content">
            <p class="message-content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    }
  }

  $('.form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form-send').prop('disabled', false);
    });
  })
});
