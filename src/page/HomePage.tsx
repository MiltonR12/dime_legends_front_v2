import wan_wan from '@/assets/imgs/wan_wan.png'
import CardCaracteristicas from '@/components/card/CardCaracteristicas'
import { Button } from '@/components/ui/button'
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import torneo1 from '@/assets/imgs/torneo1.png'
import torneo2 from '@/assets/imgs/torneo2.jpeg'
import torneo3 from '@/assets/imgs/torneo3.png'
import CardLastTorneo from '@/components/card/CardLastTorneo';
import Footer from '@/components/ui/Footer';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main>

      <section className='h-screen grid grid-cols-2 fondo_portada' >
        <div className='flex flex-col items-center justify-center' >
          <div>
            <h1 className='text-8xl text-primary font-bold mb-5' >
              HELL HEIM
            </h1>
            <p className='text-lg text-zinc-200 mb-5' >
              Participa en la leyenda de Dime, un mundo de aventuras y misterios.
            </p>
            <Button
              size="lg"
              className='border-2 border-primary text-primary rounded-2xl text-2xl px-8 py-3 h-auto'
              asChild
            >
              <Link to='/torneos' >
                Comenzar
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <img src={wan_wan} alt="" className='h-full object-cover object-left' />
        </div>
      </section>

      <section className='py-20' >
        <h2 className='text-4xl text-center font-bold mb-5' >
          ¿Cómo Funciona?
        </h2>
        <p className='text-center text-lg text-zinc-200 mb-10' >
          Dime Legends es una plataforma de torneos online que te permite competir en tus juegos favoritos y ganar premios increíbles. ¡Es fácil y divertido!
        </p>

        <div className='container mx-auto flex flex-col md:flex-row gap-10' >
          <CardCaracteristicas
            title='Organiza tus Torneos'
            description='Crea y personaliza tus propios torneos con facilidad. Establece reglas, elige los juegos y administra a los participantes desde una interfaz intuitiva.'
          >
            <FaRegCalendarPlus className='text-6xl text-primary' />
          </CardCaracteristicas>
          <CardCaracteristicas
            title='Compite en Gran Escala'
            description='Únete a torneos globales y mide tus habilidades contra jugadores de todo el mundo. Participa en eventos épicos y demuestra que eres el mejor.'
          >
            <FaUsers className='text-6xl text-primary' />
          </CardCaracteristicas>
          <CardCaracteristicas
            title='Gana Premios Increíbles'
            description='Compite por premios emocionantes, desde dinero en efectivo hasta equipo gamer de última generación. ¡Cada torneo es una oportunidad para ganar!'
          >
            <TfiCup className='text-6xl text-primary' />
          </CardCaracteristicas>
        </div>
      </section>

      <section className='px-5 py-10' >

        <h2 className='text-4xl text-center font-bold mb-5' >
          Torneos Anteriores
        </h2>

        <p className='text-center text-lg text-zinc-200 mb-10' >
          Descubre los torneos anteriores y los increíbles premios que se han repartido. ¡No te pierdas la oportunidad de ganar en el próximo!
        </p>

        <div className='grid md:grid-cols-3 max-w-6xl mx-auto flex-col gap-10' >
          <div className='md:col-span-2' >
            <CardLastTorneo
              title='Torneo de Verano'
              description='¡El torneo de verano ha llegado! Participa y gana premios increíbles en los juegos más populares.'
              date='12 de Agosto, 2021'
              image={torneo1}
            />
          </div>

          <div className='hidden md:block' ></div>
          <div className='hidden md:block' ></div>

          <div className='md:col-span-2 md:start-2' >
            <CardLastTorneo
              title='Torneo de Invierno'
              description='¡El torneo de invierno ha llegado! Participa y gana premios increíbles en los juegos más populares.'
              date='12 de Diciembre, 2021'
              image={torneo2}
            />
          </div>

          <div className='md:col-span-2' >
            <CardLastTorneo
              title='Torneo de Primavera'
              description='¡El torneo de primavera ha llegado! Participa y gana premios increíbles en los juegos más populares.'
              date='12 de Marzo, 2022'
              image={torneo3}
            />
          </div>
        </div>
      </section>

      <section className='fondo_participa h-[50vh] flex items-center justify-center' >
        <div className='container mx-auto text-center py-10' >
          <h2 className='text-5xl font-bold mb-5' >
            ¿Listo para Competir?
          </h2>
          <p className='text-xl text-zinc-200 mb-10 max-w-2xl mx-auto' >
            ¡Regístrate ahora y comienza a competir en los torneos más emocionantes! Demuestra tus habilidades y gana premios increíbles.
          </p>
          <Button
            size="lg"
            className='bg-white text-fondo hover:bg-primary hover:text-white rounded-2xl text-2xl px-8 py-3 h-auto'
          >
            Regístrate
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default HomePage