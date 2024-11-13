import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import TreegraphModule from 'highcharts/modules/treegraph';
import TreemapModule from 'highcharts/modules/treemap';
import ExportingModule from 'highcharts/modules/exporting';
import AccessibilityModule from 'highcharts/modules/accessibility';
import NoDataToDisplayModule from 'highcharts/modules/no-data-to-display';
import OfflineExportingModule from 'highcharts/modules/offline-exporting';
import { ApiService, OrgMetricPayload } from '../api.service';

HighchartsMore(Highcharts);
TreemapModule(Highcharts);
TreegraphModule(Highcharts);
ExportingModule(Highcharts);
AccessibilityModule(Highcharts);
NoDataToDisplayModule(Highcharts);
OfflineExportingModule(Highcharts);

@Component({
  selector: 'app-tree-graph-component',
  standalone: true,
  imports: [],
  templateUrl: './tree-graph-component.component.html',
  styleUrl: './tree-graph-component.component.css',
})
export class TreeGraphComponentComponent implements OnInit, OnChanges {
  @Input() graphData: any = [];
  seriesData: any = [];
  chartHeight: number = 600;

  constructor(@Inject(ApiService) private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'graphData' in changes &&
      changes['graphData'].currentValue !== changes['graphData'].previousValue
    ) {
      this.graphData = changes['graphData'].currentValue;
      const { data, nodes } = this.graphData;
      if (data && nodes && data.length > 0 && nodes.length > 0) {
        this.seriesData = this.transformResponse(data, nodes);
        this.chartHeight = 800;
        this.renderTreeGraph();
      }
    }
  }

  ngOnInit(): void {
    this.renderTreeGraph();
  }

  transformResponse(data, nodes) {
    const nodesMap = new Map(
      nodes.map((node) => [node.id, { ...node, children: [] }]),
    );
    const transformedData: any[] = [];

    data.forEach(([parentId, childId]) => {
      const parentNode: any = nodesMap.get(parentId);
      const childNode: any = nodesMap.get(childId);
      const levelColors = [
        '#feb56a',
        '#2caffe',
        'rgb(165,0,0)',
        'rgb(46, 224, 202)',
        'rgb(208, 33, 24)',
        'rgb(0, 12, 62)',
        'rgb(44, 175, 254)',
      ];
      if (parentNode && childNode) {
        const parentLevel = parentNode.level || 0;
        childNode.level = parentLevel + 1;
        const childColor = levelColors[childNode.level - 1] || '#000';
        transformedData.push({
          name: childNode.name || childNode.label,
          id: childNode.id,
          label: childNode.label,
          level: childNode.level,
          collapsed: childNode.level > 3,
          parent: parentNode.id,
          link: {
            type: 'curved',
            lineWidth: 1,
            color: '#000',
          },
          marker: {
            radius: 10,
            lineWidth: 3,
            symbol: 'circle',
            fillOpacity: 1,
            lineColor: childColor,
            fillColor: '#fff',
          },
        });

        if (!transformedData.some((node) => node.id === parentNode.id)) {
          const parentColor = levelColors[parentNode.level - 1] || '#000';
          transformedData.push({
            name: parentNode.name || parentNode.label,
            label: parentNode.label,
            level: parentNode.level,
            collapsed: parentNode.level > 3,
            id: parentNode.id,
            marker: {
              radius: 10,
              lineWidth: 3,
              symbol: 'circle',
              fillOpacity: 1,
              lineColor: parentColor,
              fillColor: '#fff',
            },
          });
        }
      }
    });

    return transformedData;
  }

  renderCard(point: any) {
    console.log(point);
    const { nodes } = this.graphData;
    if (point?.id && nodes) {
      const idx: number = nodes.findIndex(
        (node: any): boolean => node?.id === point?.id,
      );
      if (idx > -1) {
        const cardData = nodes[idx];
        this.apiService.renderDetailCard$.next(cardData);
        const orgMetricPayload: OrgMetricPayload = {
          first_name: cardData?.firstName,
          last_name: cardData?.lastName,
          company: cardData?.company,
        };
        this.apiService
          .fetchOrgMetrics(orgMetricPayload)
          .subscribe((data: any): void => {
            if (data?.departments) {
              data.departments = data?.departments.reduce(
                (acc: any, curr: any) => {
                  return acc.concat(curr);
                },
                '',
              );
            }
            this.apiService.renderOrgMetricCard$.next(data);
          });
      }
    }
  }

  renderTreeGraph(): void {
    const calculatedHeight = Math.max(600, this.seriesData.length * 60);
    Highcharts.chart('container', {
      chart: {
        spacingBottom: 30,
        marginRight: 120,
        height: calculatedHeight / 5 > 400 ? calculatedHeight / 5 : 660,
      },
      title: {
        text: 'Organisation Graph',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'treegraph',
          keys: ['parent', 'id', 'level'],
          data: this.seriesData,
          marker: {
            symbol: 'circle',
            radius: 6,
            color: '#fff',
            lineWidth: 3,
          },
          point: {
            events: {
              click: (event) => this.renderCard(event.point),
            },
          },
          dataLabels: {
            enabled: true,
            align: 'left',
            style: {
              color: '#000',
              textOutline: '3px #ffffff',
              whiteSpace: 'nowrap',
            },
            x: 24,
          },
          levels: [
            {
              level: 1,
            },
            {
              level: 2,
            },
            {
              level: 3,
              colorVariation: {
                key: 'brightness',
                to: -0.5,
              },
            },
            {
              level: 4,
              colorVariation: {
                key: 'brightness',
                to: 0.5,
              },
            },
            {
              level: 6,
              dataLabels: {
                x: 10,
              },
            },
          ],
        },
      ],
      tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.label}</b>',
      },
    });
  }
}
