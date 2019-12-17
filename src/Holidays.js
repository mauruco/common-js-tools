const moment = require('moment');

class Holidays {
  constructor() {
    const year = moment().format('YYYY');
    if (year > 2029) throw new Error('Holidays service has no support for 2030 or higher');
    if (year === 2029) console.log('Holidays service has no support for 2030 or higher');
    // 10 anos de deferiados, não vale a pena ficar cutucando uma tabela na DB pra tão poucos dados
    this.holidays = {
      20190101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20190304: { title: 'Carnaval', type: 'Facultativo' },
      20190305: { title: 'Carnaval', type: 'Facultativo' },
      20190306: { title: 'Carnaval', type: 'Facultativo' },
      20190419: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20190421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20190501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20190620: { title: 'Corpus Christi', type: 'Facultativo' },
      20190907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20191012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20191015: { title: 'Dia do Professor', type: 'Facultativo' },
      20191028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20191102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20191115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20191225: { title: 'Natal', type: 'Feriado Nacional' },
      20200101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20200224: { title: 'Carnaval', type: 'Facultativo' },
      20200225: { title: 'Carnaval', type: 'Facultativo' },
      20200226: { title: 'Carnaval', type: 'Facultativo' },
      20200410: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20200421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20200501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20200611: { title: 'Corpus Christi', type: 'Facultativo' },
      20200907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20201012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20201015: { title: 'Dia do Professor', type: 'Facultativo' },
      20201028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20201102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20201115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20201225: { title: 'Natal', type: 'Feriado Nacional' },
      20210101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20210215: { title: 'Carnaval', type: 'Facultativo' },
      20210216: { title: 'Carnaval', type: 'Facultativo' },
      20210217: { title: 'Carnaval', type: 'Facultativo' },
      20210402: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20210421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20210501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20210603: { title: 'Corpus Christi', type: 'Facultativo' },
      20210907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20211012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20211015: { title: 'Dia do Professor', type: 'Facultativo' },
      20211028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20211102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20211115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20211225: { title: 'Natal', type: 'Feriado Nacional' },
      20220101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20220228: { title: 'Carnaval', type: 'Facultativo' },
      20220301: { title: 'Carnaval', type: 'Facultativo' },
      20220302: { title: 'Carnaval', type: 'Facultativo' },
      20220415: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20220421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20220501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20220616: { title: 'Corpus Christi', type: 'Facultativo' },
      20220907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20221012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20221015: { title: 'Dia do Professor', type: 'Facultativo' },
      20221028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20221102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20221115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20221225: { title: 'Natal', type: 'Feriado Nacional' },
      20230101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20230220: { title: 'Carnaval', type: 'Facultativo' },
      20230221: { title: 'Carnaval', type: 'Facultativo' },
      20230222: { title: 'Carnaval', type: 'Facultativo' },
      20230407: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20230421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20230501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20230608: { title: 'Corpus Christi', type: 'Facultativo' },
      20230907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20231012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20231015: { title: 'Dia do Professor', type: 'Facultativo' },
      20231028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20231102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20231115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20231225: { title: 'Natal', type: 'Feriado Nacional' },
      20240101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20240212: { title: 'Carnaval', type: 'Facultativo' },
      20240213: { title: 'Carnaval', type: 'Facultativo' },
      20240214: { title: 'Carnaval', type: 'Facultativo' },
      20240329: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20240421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20240501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20240530: { title: 'Corpus Christi', type: 'Facultativo' },
      20240907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20241012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20241015: { title: 'Dia do Professor', type: 'Facultativo' },
      20241028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20241102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20241115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20241225: { title: 'Natal', type: 'Feriado Nacional' },
      20250101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20250303: { title: 'Carnaval', type: 'Facultativo' },
      20250304: { title: 'Carnaval', type: 'Facultativo' },
      20250305: { title: 'Carnaval', type: 'Facultativo' },
      20250418: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20250421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20250501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20250619: { title: 'Corpus Christi', type: 'Facultativo' },
      20250907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20251012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20251015: { title: 'Dia do Professor', type: 'Facultativo' },
      20251028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20251102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20251115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20251225: { title: 'Natal', type: 'Feriado Nacional' },
      20260101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20260216: { title: 'Carnaval', type: 'Facultativo' },
      20260217: { title: 'Carnaval', type: 'Facultativo' },
      20260218: { title: 'Carnaval', type: 'Facultativo' },
      20260403: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20260421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20260501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20260604: { title: 'Corpus Christi', type: 'Facultativo' },
      20260907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20261012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20261015: { title: 'Dia do Professor', type: 'Facultativo' },
      20261028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20261102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20261115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20261225: { title: 'Natal', type: 'Feriado Nacional' },
      20270101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20270208: { title: 'Carnaval', type: 'Facultativo' },
      20270209: { title: 'Carnaval', type: 'Facultativo' },
      20270210: { title: 'Carnaval', type: 'Facultativo' },
      20270326: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20270421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20270501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20270527: { title: 'Corpus Christi', type: 'Facultativo' },
      20270907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20271012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20271015: { title: 'Dia do Professor', type: 'Facultativo' },
      20271028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20271102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20271115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20271225: { title: 'Natal', type: 'Feriado Nacional' },
      20280101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20280228: { title: 'Carnaval', type: 'Facultativo' },
      20280229: { title: 'Carnaval', type: 'Facultativo' },
      20280301: { title: 'Carnaval', type: 'Facultativo' },
      20280414: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20280421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20280501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20280615: { title: 'Corpus Christi', type: 'Facultativo' },
      20280907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20281012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20281015: { title: 'Dia do Professor', type: 'Facultativo' },
      20281028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20281102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20281115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20281225: { title: 'Natal', type: 'Feriado Nacional' },
      20290101: { title: 'Ano Novo', type: 'Feriado Nacional' },
      20290212: { title: 'Carnaval', type: 'Facultativo' },
      20290213: { title: 'Carnaval', type: 'Facultativo' },
      20290214: { title: 'Carnaval', type: 'Facultativo' },
      20290330: { title: 'Sexta-Feira Santa', type: 'Feriado Nacional' },
      20290421: { title: 'Dia de Tiradentes', type: 'Feriado Nacional' },
      20290501: { title: 'Dia do Trabalho', type: 'Feriado Nacional' },
      20290531: { title: 'Corpus Christi', type: 'Facultativo' },
      20290907: { title: 'Independência do Brasil', type: 'Feriado Nacional' },
      20291012: { title: 'Nossa Senhora Aparecida', type: 'Feriado Nacional' },
      20291015: { title: 'Dia do Professor', type: 'Facultativo' },
      20291028: { title: 'Dia do Servidor Público', type: 'Facultativo' },
      20291102: { title: 'Dia de Finados', type: 'Feriado Nacional' },
      20291115: { title: 'Proclamação da República', type: 'Feriado Nacional' },
      20291225: { title: 'Natal', type: 'Feriado Nacional' },
    };
  }

  isHoliday(dateTime) {
    try {
      const day = moment(dateTime).isoWeekday();
      if (day === 6 || day === 7) return true;
      if (!dateTime || dateTime.toString().length < 10) throw new Error('Holidays - @isHoliday - dateTime is not YYYY-MM-DD formated');
      const date = parseInt(dateTime.replace(/-/g, '').slice(0, 8), 10);
      return !!this.holidays[date];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getNextWorkDay(datetime, i) {
    try {
      let y = i || 0;
      const date = moment(datetime);
      if (y) date.add(y, 'days');
      let day = date.format('YYYY-MM-DD');
      if (this.isHoliday(day)) {
        day = this.getNextWorkDay(datetime, ++y);
        return day;
      }
      return day;
    } catch (error) {
      this.log(error);
      return false;
    }
  }
}

module.exports = Holidays;
