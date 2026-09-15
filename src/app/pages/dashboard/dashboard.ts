import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../../componentes/menu/menu';
import { Veiculo } from '../../models/veiculo.model';
import { Vehicles } from '../../services/vehicles';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Menu, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  veiculos: Veiculo[] = [];
  veiculoSelecionado: Veiculo | null = null;

  vinDigitado: string = '';
  odometro: number = 0;
  nivelCombustivel: number = 0;
  statusVeiculo: string = '-';
  lat: number = 0;
  long: number = 0;

  private mapVins: { [key: number]: string } = {
    1: "2FRHDUYS2Y63NHD22454",
    2: "2RFAASDY54E4HDU34874",
    3: "2FRHDUYS2Y63NHD22455",
    4: "2RFAASDY54E4HDU34875",
    5: "2FRHDUYS2Y63NHD22654",
    6: "2FRHDUYS2Y63NHD22854"
  };

  constructor(private vehicleService: Vehicles) {}

  ngOnInit(): void {
    this.vehicleService.getVeiculos().subscribe(
      (response: any) => {
        this.veiculos = response.vehicles.map((v: any) => ({
          ...v,
          imagem: v.img ? v.img.replace('http://localhost:3001', '') : ''
        }));
      }
    );
  }

  veiculoEscolhido(event: Event): void {
    const idSelecionado = Number((event.target as HTMLSelectElement).value);

    if (idSelecionado) {
      this.veiculoSelecionado = this.veiculos.find(v => v.id == idSelecionado) || null;

      const vinEncontrado = this.mapVins[idSelecionado];

      if (vinEncontrado) {
        this.vinDigitado = vinEncontrado;
        this.buscarDadosPorVin(vinEncontrado);
      }
    } else {
      this.veiculoSelecionado = null;
      this.limparTabela();
    }
  }

  buscarDadosPorVin(vin: string): void {
    this.vehicleService.getDataVeiculo(vin).subscribe({
      next: (dados) => {
        this.odometro = dados.odometro;
        this.nivelCombustivel = dados.nivelCombustivel;
        this.statusVeiculo = dados.status;
        this.lat = dados.lat;
        this.long = dados.long;
      },
      error: (err) => {
        console.error("Erro ao buscar dados do veículo", err);
        this.limparTabela();
      }
    });
  }

  limparTabela(): void {
    this.vinDigitado = '';
    this.odometro = 0;
    this.nivelCombustivel = 0;
    this.statusVeiculo = '-';
    this.lat = 0;
    this.long = 0;
  }
}