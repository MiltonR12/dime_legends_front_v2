import fanny_image from '@/assets/imgs/personajes/fanny.png'
import personajes_iamge from '@/assets/imgs/personajes/personajes.png'
import esmeralda from '@/assets/imgs/personajes/esmeralda.png'
import nana from '@/assets/imgs/personajes/nana.png'
import Footer from '@/components/ui/Footer';
import { Link } from 'react-router-dom';
import CardInfo from '@/components/card/CardInfo';
import { FaUsers } from 'react-icons/fa'
import { TfiCup } from 'react-icons/tfi'
import { RiOrganizationChart } from 'react-icons/ri'
import CardFormat from '@/components/card/CardFormat'
import { BankDepositIcon, CompleteIcon, MedalIcon, RegisterIcon } from '@/components/icons/globals';
import CardLastTorneo from '@/components/card/CardLastTorneo'
import banner1 from '@/assets/imgs/banner/pausa.png'
import banner2 from '@/assets/imgs/banner/sabado.png'
import banner3 from '@/assets/imgs/banner/domingo.png'
import banner4 from '@/assets/imgs/banner/flayer.png'

function HomePage() {
  return (
    <main className='bg-[#1D023E]' >

      <section className='h-screen overflow-hidden relative grid grid-cols-2 bg-[#1D023E]' >
        <div className='absolute z-0' >
          <img src={personajes_iamge} alt="" className='h-full object-cover object-right' />
        </div>
        <div className='flex flex-col px-5 items-end z-40 justify-center' >
          <div>
            <h1 className='text-4xl md:text-8xl font-bold ' >
              <span className='text-gradient' >DIME</span>  <span className='transparent-text' >LEGENDS</span>
            </h1>
            <p className='text-2xl text-white font-semibold mb-5 md:pl-2' >
              Participa en la competencia, ¡el trono te espera!
            </p>
            <Link to='/torneos'
              className='btn-gradient flex items-center justify-center p-1 rounded-3xl max-w-52 text-2xl' >
              <span className='bg-violetPrimary w-full h-full rounded-3xl text-center p-1' >
                <span className='text-gradient' >
                  VER TORNEOS
                </span>
              </span>
            </Link>
          </div>
        </div>
        <div className='flex justify-end pt-16' >
          <img src={fanny_image} alt="" className='object-cover object-left' />
        </div>
      </section>

      <div className='section_funtiona' >
        <section className='pb-20 px-5 xl:px-20' >
          <div className='xl:w-[80vw] mx-auto rounded-3xl overflow-hidden py-10 fondo-gradient' >
            <h2 className='text-4xl text-center font-semibold pb-10' >
              COMO FUNCIONA
            </h2>
            <div className='container mx-auto flex flex-col md:flex-row md:justify-center gap-10' >
              <CardInfo
                icon={FaUsers}
                title='COMPITE'
                subtitle='en gran escala'
                description='Enfréntate a los mejores jugadores y demuestra tu habilidad.'
              />
              <CardInfo
                icon={RiOrganizationChart}
                title='ORGANIZA'
                subtitle='tus torneos'
                description='Crea y gestiona tus propios torneos fácilmente.'
              />
              <CardInfo
                icon={TfiCup}
                title='GANA'
                subtitle='premios Increíbles'
                description='Obtén premios increíbles en cada torneo.'
              />
            </div>
          </div>
        </section>

        <section className='px-5 py-10' >

          <h2 className='text-4xl text-center font-semibold pb-10' >
            FORMATO DEL TORNEO
          </h2>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <CardFormat
              icon={<RegisterIcon />}
              title='REGISTRATE'
              description='Regístrate en el torneo que más te guste.'
            />
            <CardFormat
              icon={<BankDepositIcon />}
              title='DEPOSITA'
              description='Realiza el depósito correspondiente al torneo.'
              className='col-start-2 row-start-2 lg:col-start-2 lg:row-start-2'
            />
            <CardFormat
              icon={<CompleteIcon />}
              title='COMPLETADO'
              description='¡Listo! Ya estás inscrito en el torneo.'
              className='col-start-1 row-start-3 lg:col-start-3 lg:row-start-1'
            />
            <CardFormat
              icon={<MedalIcon />}
              title='GANA & APRENDE'
              description='Demuestra tus habilidades y aprende de los mejores.'
              className='col-start-2 row-start-4 lg:col-start-4 lg:row-start-2'
            />
          </div>

        </section>
      </div>

      <section className='bg-violetPrimary px-5' >
        <h3 className='text-3xl md:text-4xl text-center font-semibold py-10' >
          TORNEOS ANTERIORES
        </h3>
        <div className='flex items-center justify-center' >
          <div className='grid lg:grid-cols-2 gap-5 lg:gap-10' >
            <CardLastTorneo
              image={banner1}
              date={new Date()}
              title='LEYENDS OF EPICS'
              description='Este es un torneo para los más valientes y fuertes'
              game='Mobile Legends'
            />
            <CardLastTorneo
              image={banner2}
              date={new Date()}
              title='LEGENDS OF THE STORM'
              description='Se parte de la leyenda y demuestra tus habilidades'
              game='Mobile Legends'
            />
            <CardLastTorneo
              image={banner3}
              date={new Date()}
              title='LA ULTIMA BATALLA'
              description='Demuestra que eres el mejor en la última batalla'
              game='Mobile Legends'
            />
            <CardLastTorneo
              image={banner4}
              date={new Date()}
              title='STORM LEGENDS'
              description='Demuestra que eres el mejor en la última batalla'
              game='Mobile Legends'
            />
          </div>
        </div>
      </section>

      <section className='section_funtiona h-[80vh] overflow-hidden relative flex items-center justify-center' >
        <div className='container mx-auto text-center py-10 z-10' >
          <h2 className='text-5xl font-bold mb-5' >
            ¿LISTO PARA COMPETIR?
          </h2>
          <p className='text-2xl text-zinc-200 mb-10 max-w-3xl mx-auto' >
            ¡Regístrate ahora y comienza a competir en los torneos más emocionantes! Demuestra tus habilidades y gana premios increíbles.
          </p>
          <div className='flex justify-center' >
            <Link to='/torneos'
              className='btn-gradient flex items-center justify-center p-1 rounded-3xl max-w-72 w-full text-2xl' >
              <span className='bg-violetPrimary w-full h-full rounded-3xl text-center p-2' >
                <span className='text-gradient' >
                  VER TORNEOS
                </span>
              </span>
            </Link>
          </div>
        </div>
        <img
          src={esmeralda}
          className='absolute -left-52 opacity-50 bottom-0 h-3/4 object-cove'
        />
        <img
          src={nana}
          className='absolute -right-60 -bottom-10 h-3/4 object-cover -rotate-45'
        />
      </section>

      <Footer />
    </main>
  )
}

export default HomePage