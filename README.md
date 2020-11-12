## UYGULAMA BAĞLANTISI
Olasılık ve İstatistik dersi grup çalışması
> Link: https://olasilik-ve-istatistik.herokuapp.com/  
> Nasıl Çalışır: https://olasilik-ve-istatistik.herokuapp.com/how-to-work

## KURULUM

Node.js'i bilgisayarınıza aşağıdaki linkten indirip kurabilirsiniz  
https://nodejs.org/en/  

Node.js kurulduktan sonra reponun klonladığı klasöre komut satırı aracılığıyla girerek   
(örn: cd desktop/olasilik-ve-istatistik) aşağıdaki komutu çalıştırmalısınız.
> npm i --save

Modüller kurulduktan sonra aşağıdaki komut ile başlatabilirsiniz varsayılan olarak localhost:3000 adresinde siteniz hazır halde açılacaktır.
> node index

## NASIL ÇALIŞIR? 

Elinizde bulunan veri setini veya bir örneklemi her verinin arasına ","(virgül) gelecek şekilde metin kutusuna yerleştirin.
> Örnek veri seti: 5,11,22,5,6,4,654,76,76,4,32,55,776,986,4,54,34,5,11,22,5,6,4,654,4,32,55,776

Eğer ki veri setiniz isteğe uygun yerleştirildiyse "Sonucu Göster" butonu ile metin kutusu arasında "Veri setiniz uygun görünüyor! Haydi ilerleyelim." yazısını göreceksiniz. Belirtilen yazıyı gördükten sonra "Sonucu Göster" butonuna tıklayarak sonuçları görebilirsiniz. Eğer ki hatalı bir veri seti girdiyseniz "Sonucu Göster" butonu ile metin kutusu arasında kırmızı arkaplan üzerinde "Lütfen istenen formatta bir veri seti giriniz." göreceksiniz bu durumda aşağıda verilen linki ziyaret edebilirsiniz;
> Nasıl Çalışır: https://olasilik-ve-istatistik.herokuapp.com/how-to-work

Sonuç sayfasına geldiğinizde sarı bir arkaplan üzerinde kendi veri setinizi ve onun hemen altında "İşlem Tamam!" adlı bir mesaj kutusu göreceksniz. Daha sonrasında sol tarafınızdaki açılır menüden istediğiniz özellikleri açıp kapayabilirsiniz. 

## KULLANILAN NPM PAKETLERİ

    "dependencies": {
        "@fortawesome/fontawesome-free": "^5.13.0",
        "animate.css": "^3.7.2",
        "bootstrap": "^4.4.1",
        "cookie-parser": "^1.4.5",
        "css-element-queries": "^1.2.3",
        "ejs": "^3.0.2",
        "express": "^4.17.1",
        "hover.css": "^2.3.2",
        "jquery": "^3.4.1",
        "js-cookie": "^2.2.1"
      }

